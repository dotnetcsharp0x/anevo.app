const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
    //$("#test").click(function () {
    //    console.log("tst");
    //    $(".left-menu").toggle();
    //});

    $("#menu-toggle").on("click", function () {
        
        $("#navbarNavDropdown").toggle("fast", function () {
            if ($("#menu-toggle i").hasClass("fa-toggle-on")) {
                $("#menu-toggle i").removeClass("fa-toggle-on").addClass("fa-toggle-off");
                $(".dashboard").css({ 'min-height': '80px' });
                $("#navbarNavDropdown").css({ 'display': 'none' });
                $(".lgtop").css({ 'max-height': '0px' });
            }
            else {
                $("#menu-toggle i").removeClass("fa-toggle-off").addClass("fa-toggle-on");
                $(".dashboard").css({ 'min-height': '100%' });
                $("#navbarNavDropdown").css({ 'display': 'grid' });
                $(".lgtop").css({ 'max-height': '100%' });
            };
        });        
    });
});




if ($(window).width() < 574) {
    $("#detail").addClass("text-center");
    $(".detail-image").addClass("d-none");

}

if ($(window).width() > 574) {
    $("#detail").removeClass("text-center");
    $(".detail-image").removeClass("d-none");

}

$(window).on('resize', function () {
    if ($(window).width() < 574) {
        $("#detail").addClass("text-center");
        $(".detail-image").addClass("d-none");
    }
    else {
        $("#detail").removeClass("text-center");
        $(".detail-image").removeClass("d-none");
    }
});