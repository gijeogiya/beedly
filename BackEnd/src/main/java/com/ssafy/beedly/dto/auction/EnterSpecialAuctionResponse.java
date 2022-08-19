package com.ssafy.beedly.dto.auction;

import com.ssafy.beedly.domain.SpecialAuction;
import com.ssafy.beedly.domain.SpecialProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterSpecialAuctionResponse {

    private List<SpecialAuctionResponse> specialAuctionResponses = new ArrayList<>();
    private Integer curSProdIdx;

    public EnterSpecialAuctionResponse(SpecialAuction specialAuction) {
        List<SpecialProduct> specialProducts = specialAuction.getSpecialBoard().getSpecialProducts();
        this.specialAuctionResponses = specialProducts
                .stream()
                .map(specialProduct -> new SpecialAuctionResponse(specialAuction.getId(), specialProduct))
                .collect(Collectors.toList());
        this.curSProdIdx = specialAuction.getCurSProdIdx();
    }
}
