var Camera3D = Class.create();

Object.extend(Camera3D.prototype, Vector3D.prototype);
Object.extend(Camera3D.prototype,
{
	up: null, target: null, zoom: null, focus: null, roll: null,
	initialize: function()
	{
		this.up = new Vector3D(0,1,0);
		this.target = new Vector3D(0,0,0);
		this.zoom = 3;
		this.focus = 500;
		this.roll = 0;
	}
});