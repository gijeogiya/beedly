package com.ssafy.beedly.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.common.exception.NotMatchException;
import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.ArtistFavorite;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.dto.ArtistDto;
import com.ssafy.beedly.dto.PersonalProductDto;
import com.ssafy.beedly.dto.artist.ArtistDescRequest;
import com.ssafy.beedly.repository.ArtistFavoriteRepository;
import com.ssafy.beedly.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.UUID;

import static com.ssafy.beedly.common.exception.NotFoundException.ARTIST_NOT_FOUND;
import static com.ssafy.beedly.common.exception.NotMatchException.CONTENT_TYPE_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArtistService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3Client amazonS3Client;
    private final ArtistRepository artistRepository;
    private final ArtistFavoriteRepository artistFavoriteRepository;

    public Slice<ArtistDto> getArtistsInfo(Pageable pageable){
        Slice<ArtistDto> artistDtos = artistRepository.findAll(pageable).map(ArtistDto::new);
        return artistDtos;
    }

    public ArtistDto getArtistInfoClose(User user, Long artistId){
        Artist findArtist = artistRepository.findById(artistId)
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        Optional<ArtistFavorite> findFavoriteInfo = artistFavoriteRepository.findByUserIdAndAndArtistId(user.getId(), artistId);

        return new ArtistDto(findArtist, findFavoriteInfo);
    }

    @Transactional
    public void updateArtistDesc(User user, ArtistDescRequest request) {
        Artist findArtist = artistRepository.findArtistByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));

        findArtist.updateDesc(request.getDesc());
    }

    @Transactional
    public Slice<PersonalProductDto> getStandByProductByArtistId(Long userId){
        return artistRepository.findStandByProductByArtistId(userId).map(PersonalProductDto::new);
    }

    @Transactional
    public Slice<PersonalProductDto> getSuccessProductByArtistId(Long userId){
        return artistRepository.findEndProductByArtistId(userId).map(PersonalProductDto::new);
    }
    @Transactional
    public void updateProfileImg(User user, MultipartFile image) {
        Artist findArtist = artistRepository.findArtistByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        String imageUrl = uploadImageS3(image);

        findArtist.updateProfilImg(imageUrl);
    }

    @Transactional
    public void updateBackGroundImg(User user, MultipartFile image) {
        Artist findArtist = artistRepository.findArtistByUserId(user.getId())
                .orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        String imageUrl = uploadImageS3(image);

        findArtist.updateBackGroundImg(imageUrl);
    }

    public String uploadImageS3(MultipartFile image) {
        String imageUrl = null;

        if(image != null) {
            if (!image.getContentType().startsWith("image")) {
                throw new NotMatchException(CONTENT_TYPE_NOT_MATCH);
            }

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(image.getSize());
            objectMetadata.setContentType(image.getContentType());
            String storeName = UUID.randomUUID().toString();

            try {
                amazonS3Client.putObject((new PutObjectRequest(bucket, storeName, image.getInputStream(), objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead)));

                // 이미지 url 가져오기
                imageUrl = amazonS3Client.getUrl(bucket, storeName).toString();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return imageUrl;
    }
}
