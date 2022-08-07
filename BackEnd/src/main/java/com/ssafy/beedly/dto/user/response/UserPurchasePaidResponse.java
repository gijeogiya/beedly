package com.ssafy.beedly.dto.user.response;

import com.ssafy.beedly.domain.PersonalSold;
import com.ssafy.beedly.domain.SpecialSold;
import com.ssafy.beedly.dto.user.common.UserDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPurchasePaidResponse {

    private UserDto userDto;
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
