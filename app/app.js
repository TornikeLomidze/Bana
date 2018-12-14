var app = angular.module('bana', ['ngRoute', 'ngCookies', 'ngImageCompress']);

app.run(function($rootScope, $route, $location) {

    $rootScope.apiLocation = 'https://api.bana.ge';

    $rootScope.goToSection = function(identificator) {

        if ($route.current.loadedTemplateUrl === 'landing.html') {
            $('html, body').animate({
                scrollTop: $('#' + identificator).offset().top
            }, 800, function(){

            });
        } else {
            $location.search({'section': identificator});
            $location.path('/');
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $('#' + $location.search().section).offset().top
                }, 800, function() {

                });
            }, 500);
        }

    }

});

app.config(function($routeProvider) {

    $routeProvider
    .when('/', {
        templateUrl : 'landing.html'
    })
    .when('/newbana', {
        templateUrl : 'newbana.html'
    })
    .when('/donation', {
        templateUrl : 'donation.html'
    })
    .when('/news', {
        templateUrl : 'news.html'
    })
    .when('/item', {
        templateUrl : 'article.html'
    })
    .when('/feedback', {
        templateUrl : 'feedback.html'
    })
    .when('/mediaKite', {
        templateUrl : 'kite.html'
    });

});

app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);

app.controller('landingController', function($scope, $rootScope, $http, $cookieStore) {
    $scope.apiLocation = $rootScope.apiLocation;

    $scope.cookiesIsHidden = $cookieStore.get('hideCookies') || false;

    $scope.hideCookiesNotification = function() {
        $scope.cookiesIsHidden = true;
        $cookieStore.put('hideCookies', true);
    }


    // Subscribe
    $scope.subscribe = function() {
        $http.post($scope.apiLocation + '/subscribe', { email: $scope.email })
        .then(function(response) {
            alert('Email subscribed!')
        })
        .catch(function(error) {
            switch (error.status) {
                case 400:
                    alert('Email validation error');
                    break;
                case 409:
                    alert('Email is already subscribed!');
                    break;
                default:
                    alert('Internal Server Error')
            }
        });
    }

    // Get funding info and date, which indicates ending time of ico
    $http.get($scope.apiLocation + '/process').then(function(response) {


    });




       $(function($){
           var contents = $('.accordeon-content');
         var titles = $('.accordeon-title');
         titles.on('click',function(){
           var title = $(this);
           contents.filter(':visible').slideUp(function(){
               $(this).prev('.accordeon-title').removeClass('is-opened');
           });

           var content = title.next('.accordeon-content');

           if (!content.is(':visible')) {
             content.slideDown(function(){title.addClass('is-opened')});
           }
         });
       });

});


app.controller('newbanaController', function($scope, $rootScope, $http, $cookieStore) {
    $scope.apiLocation = $rootScope.apiLocation;

});

app.controller('feedbackController', function($scope, $rootScope, $http, $cookieStore) {
    $scope.apiLocation = $rootScope.apiLocation;


});


app.controller('newsController', function($scope, $rootScope, $http, $cookieStore) {
    $scope.apiLocation = $rootScope.apiLocation;
});

app.controller('articleModulController', function($scope, $rootScope, $http, $cookieStore) {
    $scope.apiLocation = $rootScope.apiLocation;
});



app.controller('avatarController', function($scope, $rootScope, $http, $cookieStore) {
    $scope.apiLocation = $rootScope.apiLocation;

    $scope.countryList = ["Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bosnia and Herzegovina", "Barbados", "Wallis and Futuna", "Saint Barthelemy", "Bermuda", "Brunei", "Bolivia", "Bahrain", "Burundi", "Benin", "Bhutan", "Jamaica", "Bouvet Island", "Botswana", "Samoa", "Bonaire, Saint Eustatius and Saba ", "Brazil", "Bahamas", "Jersey", "Belarus", "Belize", "Russia", "Rwanda", "Serbia", "East Timor", "Reunion", "Turkmenistan", "Tajikistan", "Romania", "Tokelau", "Guinea-Bissau", "Guam", "Guatemala", "South Georgia and the South Sandwich Islands", "Greece", "Equatorial Guinea", "Guadeloupe", "Japan", "Guyana", "Guernsey", "French Guiana", "Georgia", "Grenada", "United Kingdom", "Gabon", "El Salvador", "Guinea", "Gambia", "Greenland", "Gibraltar", "Ghana", "Oman", "Tunisia", "Jordan", "Croatia", "Haiti", "Hungary", "Hong Kong", "Honduras", "Heard Island and McDonald Islands", "Venezuela", "Puerto Rico", "Palestinian Territory", "Palau", "Portugal", "Svalbard and Jan Mayen", "Paraguay", "Iraq", "Panama", "French Polynesia", "Papua New Guinea", "Peru", "Pakistan", "Philippines", "Pitcairn", "Poland", "Saint Pierre and Miquelon", "Zambia", "Western Sahara", "Estonia", "Egypt", "South Africa", "Ecuador", "Italy", "Vietnam", "Solomon Islands", "Ethiopia", "Somalia", "Zimbabwe", "Saudi Arabia", "Spain", "Eritrea", "Montenegro", "Moldova", "Madagascar", "Saint Martin", "Morocco", "Monaco", "Uzbekistan", "Myanmar", "Mali", "Macao", "Mongolia", "Marshall Islands", "Macedonia", "Mauritius", "Malta", "Malawi", "Maldives", "Martinique", "Northern Mariana Islands", "Montserrat", "Mauritania", "Isle of Man", "Uganda", "Tanzania", "Malaysia", "Mexico", "Israel", "France", "British Indian Ocean Territory", "Saint Helena", "Finland", "Fiji", "Falkland Islands", "Micronesia", "Faroe Islands", "Nicaragua", "Netherlands", "Norway", "Namibia", "Vanuatu", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "New Zealand", "Nepal", "Nauru", "Niue", "Cook Islands", "Kosovo", "Ivory Coast", "Switzerland", "Colombia", "China", "Cameroon", "Chile", "Cocos Islands", "Canada", "Republic of the Congo", "Central African Republic", "Democratic Republic of the Congo", "Czech Republic", "Cyprus", "Christmas Island", "Costa Rica", "Curacao", "Cape Verde", "Cuba", "Swaziland", "Syria", "Sint Maarten", "Kyrgyzstan", "Kenya", "South Sudan", "Suriname", "Kiribati", "Cambodia", "Saint Kitts and Nevis", "Comoros", "Sao Tome and Principe", "Slovakia", "South Korea", "Slovenia", "North Korea", "Kuwait", "Senegal", "San Marino", "Sierra Leone", "Seychelles", "Kazakhstan", "Cayman Islands", "Singapore", "Sweden", "Sudan", "Dominican Republic", "Dominica", "Djibouti", "Denmark", "British Virgin Islands", "Germany", "Yemen", "Algeria", "United States", "Uruguay", "Mayotte", "United States Minor Outlying Islands", "Lebanon", "Saint Lucia", "Laos", "Tuvalu", "Taiwan", "Trinidad and Tobago", "Turkey", "Sri Lanka", "Liechtenstein", "Latvia", "Tonga", "Lithuania", "Luxembourg", "Liberia", "Lesotho", "Thailand", "French Southern Territories", "Togo", "Chad", "Turks and Caicos Islands", "Libya", "Vatican", "Saint Vincent and the Grenadines", "United Arab Emirates", "Andorra", "Antigua and Barbuda", "Afghanistan", "Anguilla", "U.S. Virgin Islands", "Iceland", "Iran", "Armenia", "Albania", "Angola", "Antarctica", "American Samoa", "Argentina", "Australia", "Austria", "Aruba", "India", "Aland Islands", "Azerbaijan", "Ireland", "Indonesia", "Ukraine", "Qatar", "Mozambique"];
    $scope.nationalityList = ["Bangladesh", "Belgium", "Burkina Faso", "Bulgaria", "Bosnia and Herzegovina", "Barbados", "Wallis and Futuna", "Saint Barthelemy", "Bermuda", "Brunei", "Bolivia", "Bahrain", "Burundi", "Benin", "Bhutan", "Jamaica", "Bouvet Island", "Botswana", "Samoa", "Bonaire, Saint Eustatius and Saba ", "Brazil", "Bahamas", "Jersey", "Belarus", "Belize", "Russia", "Rwanda", "Serbia", "East Timor", "Reunion", "Turkmenistan", "Tajikistan", "Romania", "Tokelau", "Guinea-Bissau", "Guam", "Guatemala", "South Georgia and the South Sandwich Islands", "Greece", "Equatorial Guinea", "Guadeloupe", "Japan", "Guyana", "Guernsey", "French Guiana", "Georgia", "Grenada", "United Kingdom", "Gabon", "El Salvador", "Guinea", "Gambia", "Greenland", "Gibraltar", "Ghana", "Oman", "Tunisia", "Jordan", "Croatia", "Haiti", "Hungary", "Hong Kong", "Honduras", "Heard Island and McDonald Islands", "Venezuela", "Puerto Rico", "Palestinian Territory", "Palau", "Portugal", "Svalbard and Jan Mayen", "Paraguay", "Iraq", "Panama", "French Polynesia", "Papua New Guinea", "Peru", "Pakistan", "Philippines", "Pitcairn", "Poland", "Saint Pierre and Miquelon", "Zambia", "Western Sahara", "Estonia", "Egypt", "South Africa", "Ecuador", "Italy", "Vietnam", "Solomon Islands", "Ethiopia", "Somalia", "Zimbabwe", "Saudi Arabia", "Spain", "Eritrea", "Montenegro", "Moldova", "Madagascar", "Saint Martin", "Morocco", "Monaco", "Uzbekistan", "Myanmar", "Mali", "Macao", "Mongolia", "Marshall Islands", "Macedonia", "Mauritius", "Malta", "Malawi", "Maldives", "Martinique", "Northern Mariana Islands", "Montserrat", "Mauritania", "Isle of Man", "Uganda", "Tanzania", "Malaysia", "Mexico", "Israel", "France", "British Indian Ocean Territory", "Saint Helena", "Finland", "Fiji", "Falkland Islands", "Micronesia", "Faroe Islands", "Nicaragua", "Netherlands", "Norway", "Namibia", "Vanuatu", "New Caledonia", "Niger", "Norfolk Island", "Nigeria", "New Zealand", "Nepal", "Nauru", "Niue", "Cook Islands", "Kosovo", "Ivory Coast", "Switzerland", "Colombia", "China", "Cameroon", "Chile", "Cocos Islands", "Canada", "Republic of the Congo", "Central African Republic", "Democratic Republic of the Congo", "Czech Republic", "Cyprus", "Christmas Island", "Costa Rica", "Curacao", "Cape Verde", "Cuba", "Swaziland", "Syria", "Sint Maarten", "Kyrgyzstan", "Kenya", "South Sudan", "Suriname", "Kiribati", "Cambodia", "Saint Kitts and Nevis", "Comoros", "Sao Tome and Principe", "Slovakia", "South Korea", "Slovenia", "North Korea", "Kuwait", "Senegal", "San Marino", "Sierra Leone", "Seychelles", "Kazakhstan", "Cayman Islands", "Singapore", "Sweden", "Sudan", "Dominican Republic", "Dominica", "Djibouti", "Denmark", "British Virgin Islands", "Germany", "Yemen", "Algeria", "United States", "Uruguay", "Mayotte", "United States Minor Outlying Islands", "Lebanon", "Saint Lucia", "Laos", "Tuvalu", "Taiwan", "Trinidad and Tobago", "Turkey", "Sri Lanka", "Liechtenstein", "Latvia", "Tonga", "Lithuania", "Luxembourg", "Liberia", "Lesotho", "Thailand", "French Southern Territories", "Togo", "Chad", "Turks and Caicos Islands", "Libya", "Vatican", "Saint Vincent and the Grenadines", "United Arab Emirates", "Andorra", "Antigua and Barbuda", "Afghanistan", "Anguilla", "U.S. Virgin Islands", "Iceland", "Iran", "Armenia", "Albania", "Angola", "Antarctica", "American Samoa", "Argentina", "Australia", "Austria", "Aruba", "India", "Aland Islands", "Azerbaijan", "Ireland", "Indonesia", "Ukraine", "Qatar", "Mozambique"];
    $scope.genderList = ["Mr.","Mrs.","Miss","Dr.","Ms.","Madam","Prof."];
    $scope.personalIdentificationList = ["PASSPORT","FOREIGN IDENTITY CARD"];

    // Subscribe
    // $scope.signIn = function(email, password) {
    //     $http.post($scope.apiLocation + '/signin', { email: email, password: password })
    //     .then(function(response) {
    //         $scope.token = response.data.data;
    //         $cookieStore.put('token', $scope.token);
    //         alert('Logged In!')
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //         alert('Error: User not found');
    //     });
    // }

});

app.directive("headerTag", function($http, $cookieStore, $rootScope) {
    return {
        restrict: "E",
        templateUrl: "/header.html",
        link: function(scope, element, attrs) {

            scope.apiLocation = $rootScope.apiLocation;

            scope.showRecoveryFields = function() {
                scope.hideForgotPassword = true;
            }

            scope.hideRecoveryFields = function() {
                scope.hideForgotPassword = false;
            }

            switch (window.location.pathname) {
                case '/newbana':
                    $('.header').addClass('bg_brown');
                    break;
                case '/donation':
                    $('.header').addClass('bg_brown');
                    break;
                case '/news':
                    $('.header').addClass('bg_brown');
                    break;
                case '/feedback':
                    $('.header').addClass('bg_brown');
                    break;
                case '/item':
                    $('.header').addClass('bg_brown');
                    break;
            }
            // Sign in
            scope.signIn = function(email, password) {
                $http.post(scope.apiLocation + '/signin', { email: email, password: password })
                .then(function(response) {
                    scope.token = response.data.data;
                    $cookieStore.put('token', scope.token);
                    alert('Logged In!')
                })
                .catch(function(error) {
                    console.log(error);
                    alert('Error: User not found');
                });
            }

        }

    };
});

app.directive("footerTag", function($http, $cookieStore, $rootScope) {
    return {
        restrict: "E",
        templateUrl: "/footer.html",
        link: function(scope, element, attrs) {

            scope.apiLocation = $rootScope.apiLocation;

            scope.showRecoveryFields = function() {
                scope.hideForgotPassword = true;
            }

            scope.hideRecoveryFields = function() {
                scope.hideForgotPassword = false;
            }

            switch (window.location.pathname) {
                case '/':
                    $('.footer').addClass('bg_brown');
                    $('.tr_b1').addClass('show');
                    break;
                case '/newbana':
                    $('.bana_bg22').addClass('show');
                    $('.tr_b2').addClass('show');
                    break;
                case '/donation':
                    $('.tr_b3').addClass('show');
                    break;
                case '/news':
                    $('.tr_b3').addClass('show');
                    break;
                case '/feedback':
                    $('.tr_b3').addClass('show');
                    break;
                case '/item':
                    $('.tr_b3').addClass('show');
                    break;

            }

        }

    };
});
