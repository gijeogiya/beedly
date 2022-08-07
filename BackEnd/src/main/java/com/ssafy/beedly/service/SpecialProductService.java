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
import com.ssafy.beedly.dto.special.product.request.CreateSpecialProductRequest;
import com.ssafy.beedly.repository.CategoryRepository;
import com.ssafy.beedly.repository.SpecialBoardRepository;
import com.ssafy.beedly.repository.SpecialProductImgRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.beedly.repository.SpecialProductRepository;
import com.ssafy.beedly.repository.query.SpecialProductQueryRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import static com.ssafy.beedly.common.ConstantClass.MAX_IMAGE_COUNT;
import static com.ssafy.beedly.common.exception.NotFoundException.*;
import static com.ssafy.beedly.common.exception.NotMatchException.CONTENT_TYPE_NOT_MATCH;
import static com.ssafy.beedly.common.exception.NotMatchException.IMG_COUNT_NOT_MATCH;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SpecialProductService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	private final SpecialProductRepository specialProductRepository;
	private final SpecialProductQueryRepository specialProductQueryRepository;
	private final CategoryRepository categoryRepository;
	private final SpecialBoardRepository specialBoardRepository;
	private final AmazonS3Client amazonS3Client;
	private final SpecialProductImgRepository specialProductImgRepository;

	// 상품 등록 + 이미지
	@Transactional
	public void save(CreateSpecialProductRequest request, List<MultipartFile> images, Long boardId){
		if ((images != null) && images.size() > MAX_IMAGE_COUNT) {
			throw new NotMatchException(IMG_COUNT_NOT_MATCH);
		}

		Category findCategory = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
		SpecialBoard findBoard = specialBoardRepository.findById(boardId)
				.orElseThrow(() -> new NotFoundException(SPECIAL_BOARD_NOT_FOUND));

		SpecialProduct save = specialProductRepository.save(SpecialProduct.createSpecialProduct(request, findCategory, findBoard));

		// 이미지 s3에 업로드
		uploadImageS3(images, save);
	}

	// 상품 수정
	@Transactional
	public void update(CreateSpecialProductRequest request, List<MultipartFile> images, Long productId){
		if ((images != null) && images.size() > MAX_IMAGE_COUNT) {
			throw new NotMatchException(IMG_COUNT_NOT_MATCH);
		}

		Category findCategory = categoryRepository.findById(request.getCategoryId())
				.orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND));
		SpecialProduct specialProduct = specialProductRepository.findById(productId)
				.orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

		specialProduct.updateSpecialProduct(request, findCategory);

		if (images != null) {
			List<SpecialProductImg> findImages = specialProductImgRepository.findAllBySpecialProductId(productId);
			if (findImages.size() > 0) {
				specialProductImgRepository.deleteAllInBatch(findImages);
			}

			// 이미지 s3에 업로드
			uploadImageS3(images, specialProduct);
		}
	}

	// 상품 삭제
	@Transactional
	public void delete(Long productId){
		SpecialProduct specialProduct = specialProductRepository.findById(productId)
				.orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND));

		specialProductRepository.delete(specialProduct);
	}

	// 이미지 s3에 업로드
	private void uploadImageS3(List<MultipartFile> images, SpecialProduct saveSpecialProduct) {
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
						specialProductImgRepository.save(SpecialProductImg.createSpecialProductImg(imageUrl, saveSpecialProduct));
					} catch (Exception ex){
						ex.printStackTrace();
					}
				}
			}
		}
	}

}
