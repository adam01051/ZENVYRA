console.log("Products frontend javascript file");

$(function () {
	$(".product-collection").on("change", () => {
		const selectedValue = $(".product-collection").val();
		if (selectedValue === "DRINK") {
			$("#product-collection").hide();
			$("#product-volume").show();
		} else {
			$("#product-volume").hide();
			$("#product-collection").show();
		}
	});

	$("#process-btn").on("click", () => {
		$(".product-container").slideToggle(500);
		$("#process-btn").css("display", "none");
	});
	$("#cancel-btn").on("click", () => {
		$(".product-container").slideToggle(100);
		$("#process-btn").css("display", "flex");
	});
    
    $(".new-product-status").on("change", async function (e) {
			const id = e.target.id;
			const productStatus = $(`#${id}.new-product-status`).val();
			console.log(productStatus);
			console.log(id);

			try {
				const response = await axios.post(`/admin/product/${id}`, {
					productStatus: productStatus,
				});
				const result = response.data;
				console.log(result);
				if (result.data) {
					console.log("product updated");
					$(".new-product-status").blur();
				} else {
					alert("product udpate failed");
				}
			} catch (error) {
				console.log("error in product status", error);
				alert("product update failed");
			}
		});

});

function validateForm() {
	const productName = $(".product-name").val();
	const productPrice = $(".product-price").val();
	const productLeftCount = $(".product-left-count").val();
	const productDesc = $(".product-desc").val();

	const productCollection = $(".product-collection").val();
	const productStatus = $(".product-status").val();
	if (
		productName === "" ||
		productPrice === "" ||
		productLeftCount === "" ||
		productStatus === "" ||
		productDesc === "" ||
		productCollection === ""
	) {
		alert(" Please insert all details!");
		return false;
	} else return true;
}

function previewFileHandler(input, order) {
	const imgClassName = input.className;

	const file = $(`.${imgClassName}`).get(0).files[0];
	const fileType = file["type"];
	const validImageType = ["image/jpg", "image/jpeg", "image/png"];

	if (!validImageType.includes(fileType)) {
		alert("Please insert only jpeg, jpg and png formats!");
	} else {
		if (file) {
			const reader = new FileReader();
			reader.onload = function () {
				$(`#image-section-${order}`).attr("src", reader.result);
			};
			reader.readAsDataURL(file);
		}
	}
}
