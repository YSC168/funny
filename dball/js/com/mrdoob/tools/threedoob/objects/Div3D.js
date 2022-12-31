var Div3D = Class.create();

Object.extend(Div3D.prototype, Vector3D.prototype);
Object.extend(Div3D.prototype,
{
	container: null, content: null, scale: 1,

	initialize: function(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.container = document.createElement("div");
		this.container.style['position'] = 'absolute';
		
		this.content = document.createElement("div");
		this.content.style['position'] = 'absolute';		
		this.container.appendChild(this.content);
	},
	
	setVisible: function()
	{
		container.style['visibility'] = 'visible';
	},
	
	setHidden: function()
	{
		container.style['visibility'] = 'hidden';
	}
});