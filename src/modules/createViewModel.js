
var menuItems = [{link: "/books", text: "Books"}, {link: "/authors", text: "Authors"}];

var createViewModel = function(){
    return {title: 'My Page Title', menuItems: menuItems};
};

module.exports = createViewModel;