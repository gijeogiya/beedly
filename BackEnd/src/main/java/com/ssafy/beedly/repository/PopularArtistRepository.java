package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.Artist;
import com.ssafy.beedly.dto.PopularArtistDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PopularArtistRepository extends JpaRepository<Artist, Long> {

    @Query(value = "select MAX(p.p_final_price) as maxfinalprice, p.artist_id as artistid from (select t1.p_final_price, t1.p_product_id, t2.artist_id from personal_sold as t1 join personal_product as t2 " +
            "on t1.p_product_id = t2.p_product_id " +
            "where t1.created_date >= DATE_SUB(NOW(), INTERVAL 1 DAY) " +
            "order by p_final_price desc) as p " +
            "group by p.artist_id LIMIT 10", nativeQuery = true)
    List<PopularArtistDto> getPopularArtist();
}
