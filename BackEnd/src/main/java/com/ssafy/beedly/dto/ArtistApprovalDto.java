package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.ArtistApproval;

public class ArtistApprovalDto {

	Long userId;
	String userEmail;
	String userNickname;

	public ArtistApprovalDto(ArtistApproval artistApproval){
		this.userId = artistApproval.getUser().getId();
		this.userEmail = artistApproval.getUser().getUserEmail();
		this.userNickname = artistApproval.getUser().getUserNickname();
	}
}
