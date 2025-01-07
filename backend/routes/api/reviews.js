
try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res
            .status(404)
            .json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    const imageCount = await ReviewImage.count({ where: { reviewId } });
    if (imageCount >= 10) {
        return res.status(403).json({
            message:
                "Maximum number of images for this resource was reached",
        });
    }

    const newImage = await ReviewImage.create({
        reviewId,
        url,
    });

    res.status(201).json(newImage);
} catch (err) {
    res.status(500).json({ message: "Failed to add image" });
}


// 5. Edit a Review
//removed review from route as test
router.put("/:reviewId", requireAuth, async (req, res) => {
const { reviewId } = req.params;
const { review, stars } = req.body;

try {
    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
        return res
            .status(404)
            .json({ message: "Review couldn't be found" });
    }

    if (existingReview.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (!review || !stars || stars < 1 || stars > 5) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            },
        });
    }

    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    res.status(200).json(existingReview);
} catch (err) {
    res.status(500).json({ message: "Failed to update the review" });
}
});

// 6. Delete a Review
//same test remove review from front of route
router.delete("/:reviewId", requireAuth, async (req, res) => {
const { reviewId } = req.params;

try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res
            .status(404)
            .json({ message: "Review couldn't be found" });
    }

    if (review.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
    }

    await review.destroy();
    res.status(200).json({ message: "Successfully deleted" });
} catch (err) {
    res.status(500).json({ message: "Failed to delete the review" });
}
});

// //Delete a Review Image
// router.delete(
//     "/review-images/:imageId",
//     requireAuth,
//     async (req, res, next) => {
//         const { imageId } = req.params;

//         try {
//             const reviewImage = await ReviewImage.findByPk(imageId, {
//                 include: {
//                     model: Review,
//                     attributes: ["userId"],
//                 },
//             });

//             if (!reviewImage) {
//                 return res.status(404).json({
//                     message: "Review Image couldn't be found",
//                 });
//             }

//             if (reviewImage.Review.userId !== req.user.id) {
//                 return res.status(403).json({
//                     message:
//                         "You are not authorized to delete this review image",
//                 });
//             }

//             await reviewImage.destroy();

//             return res.status(200).json({
//                 message: "Successfully deleted",
//             });
//         } catch (error) {
//             next(error);
//         }
//     }
// );

module.exports = router;
