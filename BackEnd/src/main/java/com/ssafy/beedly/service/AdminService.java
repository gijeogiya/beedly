package com.ssafy.beedly.service;

import com.ssafy.beedly.common.exception.NotFoundException;
import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.domain.ArtistApproval;
import com.ssafy.beedly.domain.User;
import com.ssafy.beedly.domain.type.UserRole;
import com.ssafy.beedly.dto.ArtistApprovalDto;
import com.ssafy.beedly.repository.ArtistApprovalRepository;
import com.ssafy.beedly.repository.ArtistRepository;
import com.ssafy.beedly.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.beedly.common.exception.NotFoundException.ARTIST_NOT_FOUND;
import static com.ssafy.beedly.domain.type.UserRole.ROLE_ARTIST;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminService {

    private final ArtistApprovalRepository artistApprovalRepository;
    private final UserRepository userRepository;
    private final ArtistRepository artistRepository;
    @Transactional
    public void saveArtistApplication(Long artistId){
        User user = userRepository.findById(artistId).orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        artistApprovalRepository.save(ArtistApproval.createArtistApproval(false, user));
        return;
    }

    @Transactional
    public void upgradeArtist(Long artistId){
        User user = userRepository.findById(artistId).orElseThrow(() -> new NotFoundException(ARTIST_NOT_FOUND));
        user.setUserRole(UserRole.valueOf("ROLE_ARTIST"));
        userRepository.save(user);
        artistApprovalRepository.save(ArtistApproval.createArtistApproval(true, user));
        artistRepository.save(Artist.createArtist(user));
        return;
    }

    @Transactional
    public Slice<ArtistApprovalDto> getArtistList(){
        Slice <ArtistApprovalDto> userList =
            artistApprovalRepository.findFalseArtistBy().map(artistApproval -> new ArtistApprovalDto(artistApproval));
        return userList;
    }
}
