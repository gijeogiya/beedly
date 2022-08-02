package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.AbsenteeBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AbsenteeBidRepository extends JpaRepository<AbsenteeBid, Long> {

}
