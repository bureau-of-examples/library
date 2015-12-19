
var menuItems = [{link: "/books", text: "Books"}, {link: "/authors", text: "Authors"}, {link:'/auth/profile', text: 'Profile'}];

var createViewModel = function(){
    return {title: 'My Page Title', menuItems: menuItems};
};

module.exports = createViewModel;