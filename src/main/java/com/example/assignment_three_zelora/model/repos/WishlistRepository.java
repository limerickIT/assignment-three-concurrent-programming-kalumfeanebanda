package com.example.assignment_three_zelora.model.repos;

import com.example.assignment_three_zelora.model.dto.WishlistItemDto;
import com.example.assignment_three_zelora.model.entitys.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Integer> {

    List<Wishlist> findByCustomerCustomerId(Integer customerId);

    Optional<Wishlist> findByCustomerCustomerIdAndProductProductId(Integer customerId, Integer productId);

    void deleteByCustomerCustomerIdAndProductProductId(Integer customerId, Integer productId);


    @Query("select new com.example.assignment_three_zelora.model.dto.WishlistItemDto(" +
            "w.wishlistId,"+
            "p.productId, " +
            "       p.productName, " +
            "       case " +
            "           when p.discountedPrice is not null and p.discountedPrice < p.price " +
            "               then p.discountedPrice " +
            "           else p.price " +
            "       end, " +
            "       w.notifyBackInStock, " +
            "       w.notifyPriceDrop " +
            "   ) " +
            "from Wishlist w " +
            "join w.product p " +
            "where w.customer.customerId = :customerId " +
            "order by w.wishlistId asc")
    List<WishlistItemDto> findItemsForCustomer(@Param("customerId") Integer customerId);

}