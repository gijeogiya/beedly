package com.ssafy.beedly.dto;

import com.ssafy.beedly.domain.AbsenteeBid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AbsenteeBidDto {
    private Long id;
    private Integer absenteeBidPrice;
    private Long personalProductId;
    private Long userId;

    public AbsenteeBidDto(AbsenteeBid absenteeBid) {
        this.id = absenteeBid.getId();
        this.absenteeBidPrice = absenteeBid.getAbsenteeBidPrice();
        this.personalProductId = absenteeBid.getPersonalProduct().getId();
        this.userId = absenteeBid.getUser().getId();
    }
}
