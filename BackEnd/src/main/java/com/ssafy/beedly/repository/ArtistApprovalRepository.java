package com.ssafy.beedly.repository;

import java.util.Optional;

import com.ssafy.beedly.domain.ArtistApproval;
import com.ssafy.beedly.domain.User;

import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ArtistApprovalRepository extends JpaRepository<ArtistApproval, Long> {

	@Query("select a from ArtistApproval a join fetch a.user where a.approvalFlag = false")
	Slice<ArtistApproval> findFalseArtistBy();

	@Query("select a from ArtistApproval a where a.user.id = :artistId")
	Optional<ArtistApproval> findByUserId(Long artistId);
}
