package com.ssafy.beedly.repository;

import com.ssafy.beedly.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
