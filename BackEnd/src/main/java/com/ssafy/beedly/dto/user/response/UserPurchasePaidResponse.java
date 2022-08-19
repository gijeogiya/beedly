package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.PersonalSold;
import com.ssafy.beedly.domain.SpecialSold;
import com.ssafy.beedly.dto.user.common.UserDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPurchasePaidResponse {

    @ApiModelProperty(notes = "구매자 정보")
    private UserDto userDto;

    @ApiModelProperty(notes = "구매한 상품 정보")
    private UserPurchaseResponse userPurchaseResponse;

    public UserPurchasePaidResponse(PersonalSold personalSold) {
        this.userDto = new UserDto(personalSold.getUser());
        this.userPurchaseResponse = new UserPurchaseResponse(personalSold);
    }

    public UserPurchasePaidResponse(SpecialSold specialSold) {
        this.userDto = new UserDto(specialSold.getUser());
        this.userPurchaseResponse = new UserPurchaseResponse(specialSold);
    }
}
