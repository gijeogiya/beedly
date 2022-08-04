package com.ssafy.beedly.service;


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
import com.ssafy.beedly.dto.ProductAndArtistDto;
import com.ssafy.beedly.dto.personal.product.request.CreatePersonalProductRequest;
import com.ssafy.beedly.repository.CategoryRepository;
import com.ssafy.beedly.repository.PersonalProductImgRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.repository.PersonalProductRepository;
import com.ssafy.beedly.repository.query.PersonalProductQueryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.beedly.common.exception.NotFoundException.CATEGORY_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotMatchException.CONTENT_TYPE_NOT_MATCH;
import static com.ssafy.beedly.common.exception.NotMatchException.IMG_COUNT_NOT_MATCH;

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

	// 상품 등록 + 이미지
	@Transactional
	public void save(User user, CreatePersonalProductRequest request, List<MultipartFile> images){
		if (images.size() > 5) {
			throw new NotMatchException(IMG_COUNT_NOT_MATCH);
		}

		Category findCategory = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));

		PersonalProduct save = PersonalProduct.createPersonalProduct(request, findCategory, user);

		// 이미지 s3에 업로드
		uploadImageS3(images, save);
	}

	// 상품 수정
	@Transactional
	public void update(PersonalProduct personalProduct){
		Optional<PersonalProduct> product = personalProductRepository.findById(personalProduct.getId());

		product.ifPresent(selectProduct ->{
			personalProductRepository.save(selectProduct);
		});
	}

	/// 상품 삭제
	@Transactional
	public void delete(SpecialProduct specialProduct){
		personalProductRepository.deleteById(specialProduct.getId());
	}

	@Transactional
	public List<ProductAndArtistDto> find(String categoryName, String orderBy, String sort){
//
//		List<PersonalProduct> =
//		List<Artist> =

		return null;
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
