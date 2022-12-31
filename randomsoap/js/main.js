window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
		if (properties.customcolor) {
            // Convert the custom color to be applied as a CSS style
            var customColor = properties.customcolor.value.split(' ');
            customColor = customColor.map(function(c) {
                return Math.ceil(c * 255);
            });
            var customColorAsCSS = 'rgb(' + customColor + ')';
			$("canvas").css("background-image","url()");
			$("canvas").css("background-color",customColorAsCSS);
        }
		if (properties.customimage) {
				$("canvas").css("background-image","url(file:///" + properties.customimage.value+")");
        }
    }
};