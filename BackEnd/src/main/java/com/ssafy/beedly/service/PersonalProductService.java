package com.ssafy.beedly.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.*;
import com.ssafy.beedly.dto.*;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import com.ssafy.beedly.repository.ArtistRepository;
import com.ssafy.beedly.repository.CategoryRepository;
import com.ssafy.beedly.repository.PersonalProductImgRepository;
import org.springframework.beans.factory.annotation.Value;

import com.ssafy.beedly.domain.Artist;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.repository.PersonalProductRepository;
import com.ssafy.beedly.repository.query.PersonalProductQueryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.beedly.common.ConstantClass.MAX_IMAGE_COUNT;
import static com.ssafy.beedly.common.exception.NotFoundException.*;
import static com.ssafy.beedly.common.exception.NotMatchException.*;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PersonalProductService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final PersonalProductRepository personalProductRepository;
	private final PersonalProductQueryRepository personalProductQueryRepository;
	private final CategoryRepository categoryRepository;
	private final AmazonS3Client amazonS3Client;
	private final PersonalProductImgRepository personalProductImgRepository;
	private final ArtistRepository artistRepository;

	// 상품 등록 + 이미지
	@Transactional
	public void save(User user, CreatePersonalProductRequest request, List<MultipartFile> images){
		if ((images != null) && images.size() > MAX_IMAGE_COUNT) {
			throw new NotMatchException(IMG_COUNT_NOT_MATCH);
		}

		Category findCategory = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
		Artist artist = artistRepository.findArtistByUserId(user.getId())
				.orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));

		PersonalProduct save = PersonalProduct.createPersonalProduct(request, findCategory, user, artist);

		// 이미지 s3에 업로드
		uploadImageS3(images, save);
	}

	// 상품 수정
	@Transactional
	public void update(User user, CreatePersonalProductRequest request, List<MultipartFile> images, Long productId
	){
		Category findCategory = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
		PersonalProduct findProduct = personalProductRepository.findById(productId)
				.orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

		if (user.getId() != findProduct.getUser().getId()) {
			throw new NotMatchException(PRODUCT_OWNER_NOT_MATCH);
		}

		if ((images != null) && images.size() > MAX_IMAGE_COUNT) {
			throw new NotMatchException(IMG_COUNT_NOT_MATCH);
		}

		findProduct.updatePersonalProduct(request, findCategory);

		if (images != null) {
			List<PersonalProductImg> findImages = personalProductImgRepository.findAllByPersonalProductId(findProduct.getId());
			if (findImages.size() > 0) {
				personalProductImgRepository.deleteAllInBatch(findImages);
			}

			uploadImageS3(images, findProduct);
		}


	}

	// 상품 삭제
	@Transactional
	public void delete(Long productId){
		PersonalProduct findProduct = personalProductRepository.findById(productId)
				.orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

		personalProductRepository.delete(findProduct);
	}
	// 상품 정보가져오기
	@Transactional
	public PersonalProductDto getProductById(Long id){
		PersonalProduct product = personalProductRepository.findById(id).get();
		PersonalProductDto dto = new PersonalProductDto(product);
		System.out.println("여기까지못옴");
		return dto;

	}

	 @Transactional
	 public PersonalProductCloseDto getProductByIdClose(Long id, Long productId){
		Boolean isFavorite = false;
		Boolean isAbsentee = false;
		List<String> tagNames = new ArrayList<>();

		List<SearchTag> searchTag = personalProductRepository.findSearchTagByProductId(id);
		Optional<User> user = personalProductRepository.findUserIdByPersonalFavorite(productId, id);
		Optional<AbsenteeBid> absenteeBid = personalProductRepository.findUserIdByAbsenteeBid(productId, id);

		PersonalProductCloseDto personalProductCloseDto = new PersonalProductCloseDto();
		personalProductCloseDto.setProductId(productId);

		if(user.isPresent()) isFavorite = true;
		personalProductCloseDto.setIsFavorite(isFavorite);
		if(absenteeBid.isPresent()) isAbsentee = true;
		personalProductCloseDto.setIsAbsenteeBid(isAbsentee);
		personalProductCloseDto.setAbsenteeBidPrice(absenteeBid.get().getAbsenteeBidPrice());
		 for (SearchTag tag : searchTag) {
			 tagNames.add(tag.getSearchTagName());
		 }

		personalProductCloseDto.setTagNames(tagNames);

		return personalProductCloseDto;
	 }

	@Transactional
	public Slice<PersonalProductDto> getProductByCategory(String categoryName, Pageable pageable){
		Slice<PersonalProductDto> products = personalProductRepository.findProductByCategory(categoryName, pageable)
				.map(PersonalProductDto::new);
		return products;
	}

//	@Transactional
	public Slice<PersonalProductDto> getProductOnAirByCategory(String categoryName, Pageable pageable){
		Slice<PersonalProductDto> products = personalProductRepository.findProductOnAirByCategory(categoryName, pageable)
				.map(PersonalProductDto::new);
		return products;
	}

	@Transactional
	public List<PersonalProduct> getProductByName(String name){
		return personalProductRepository.findPersonalProductByProductNameLike(name);
	}

	@Transactional
	public Slice<PersonalProductDto> getProductBySize(Integer width, Integer height, Pageable pageable){
		Slice<PersonalProductDto> products = personalProductRepository.findProductBySize(width, height, pageable)
				.map(PersonalProductDto::new);
		return products;
	}

	private void uploadImageS3(List<MultipartFile> images, PersonalProduct savePersonalProduct) {
		if (images != null && (!images.isEmpty())) {
			ObjectMetadata objectMetadata = new ObjectMetadata();

			for (MultipartFile img : images) {
				if (!img.isEmpty()) {
					if(!img.getContentType().startsWith("image")){
						throw new NotMatchException(CONTENT_TYPE_NOT_MATCH);
					}

					objectMetadata.setContentLength(img.getSize());
					objectMetadata.setContentType(img.getContentType());
					String storeName = UUID.randomUUID().toString();

					try {
						amazonS3Client.putObject(new PutObjectRequest(bucket, storeName, img.getInputStream(), objectMetadata)
								.withCannedAcl(CannedAccessControlList.PublicRead));

						//이미지 url 가져오기
						String imageUrl = amazonS3Client.getUrl(bucket, storeName).toString();

						// 이미지 저장
						personalProductImgRepository.save(PersonalProductImg.createSpecialProductImg(imageUrl, savePersonalProduct));
					} catch (Exception ex){
						ex.printStackTrace();
					}
				}
			}
		}
	}
}
