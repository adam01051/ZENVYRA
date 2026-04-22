console.log("Signup frontend javascript file");

$(function () {
	const fileTarget = $(".file-box .upload-hidden");
	let filename;

	fileTarget.on("change", function () {
		if (window.FileReader) {
			const uploadFile = $(this)[0].files[0];
			const fileType = uploadFile["type"];
			const validImageType = ["image/jpg", "image/jpeg", "image/png"];
			if (!validImageType.includes(fileType)) {
				alert("Please insert only jpeg, jpg and png formats!");
			} else {
				if (uploadFile) {
					console.log(URL.createObjectURL(uploadFile));
					$(".upload-img-frame")
						.attr("src", URL.createObjectURL(uploadFile))
						.addClass("sucess");
				}
				filename = $(this)[0].files[0].name;
			}
			$(this).siblings(".upload-name").val(filename);
		}
	});
});

function validateSignupForm() {
	const memberNick = $(".member-nick").val();
	const memberPhone = $(".member-phone").val();
	const memberPassword = $(".member-password").val();
	const confirmPassword = $(".confirm-password").val();

	if (
		memberNick === "" ||
		memberPhone === "" ||
		memberPassword === "" ||
		confirmPassword === ""
	) {
		alert(" Please insert all required!");
		return false;
	}

	if (memberPassword !== confirmPassword) {
		alert("Password different, Please check it!");
		return false;
	}

	const memberImage = $(".member-image").get(0).files[0]
		? $(".member-image").get(0).files[0].name
		: snull;
	if (!memberImage) {
		alert("Please insert restaurant image!");
		return false;
	}
}




console.log("Signup frontend javascript file");

$(function () {
	const fileTarget = $(".file-box .upload-hidden");
	let filename = "";

	fileTarget.on("change", function () {
		if (!window.FileReader) return;

		const uploadFile = this.files[0];
		if (!uploadFile) return;

		const validImageType = ["image/jpg", "image/jpeg", "image/png"];

		if (!validImageType.includes(uploadFile.type)) {
			alert("please insert jpeg, jpg, or png");
			$(this).val("");
			return;
		}

		$(".upload-img-frame")
			.attr("src", URL.createObjectURL(uploadFile))
			.addClass("success");

		filename = uploadFile.name;
		$(this).siblings(".upload-name").val(filename);
	});
});

function validateSignupForm() {
	const memberNick = $(".member-nick").val();
	const memberPhone = $(".member-phone").val();
	const memberPassword = $(".member-password").val();
	const confirmPassword = $(".confirm-password").val();

	if (!memberNick || !memberPhone || !memberPassword || !confirmPassword) {
		alert("please insert all required inputs");
		return false;
	}

	if (memberPassword !== confirmPassword) {
		alert("password differs, please check input");
		return false;
	}

	const fileInput = $(".member-image").get(0);
	if (!fileInput || !fileInput.files.length) {
		alert("please insert restaurant image");
		return false;
	}

	return true;
}

