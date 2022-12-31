var Matrix3D = Class.create();

Matrix3D.prototype = {
    n11: null,
    n12: null,
    n13: null,
    n14: null,
    n21: null,
    n22: null,
    n23: null,
    n24: null,
    n31: null,
    n32: null,
    n33: null,
    n34: null,
    
    x: new Vector3D(0,0,0),
    y: new Vector3D(0,0,0),
    z: new Vector3D(0,0,0),
    
    initialize: function(){
		this.identity();
    },
    
    identity: function(){
        this.n11 = 1;
        this.n12 = 0;
        this.n13 = 0;
        this.n14 = 0;
        this.n21 = 0;
        this.n22 = 1;
        this.n23 = 0;
        this.n24 = 0;
        this.n31 = 0;
        this.n32 = 0;
        this.n33 = 1;
        this.n34 = 0;
        
        this.x = new Vector3D(0,0,0);
        this.y = new Vector3D(0,0,0);
        this.z = new Vector3D(0,0,0);
    },
    
    lookAt: function(eye, center, up){
		
        this.z.copy(center);
        this.z.sub(eye);
        this.z.normalize();
        
        this.x.copy(this.z);
        this.x.cross(up);
        this.x.normalize();
        
        this.y.copy(this.x);
        this.y.cross(this.z);
        this.y.normalize();
        
        this.n11 = this.x.x;
        this.n12 = this.x.y;
        this.n13 = this.x.z;
        this.n14 = -this.x.dot(eye);
        this.n21 = this.y.x;
        this.n22 = this.y.y;
        this.n23 = this.y.z;
        this.n24 = -this.y.dot(eye);
        this.n31 = this.z.x;
        this.n32 = this.z.y;
        this.n33 = this.z.z;
        this.n34 = -this.z.dot(eye);
    },
    
    transform: function(v){
        var vx = v.x, vy = v.y, vz = v.z;
        
        v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14;
        v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24;
        v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34;
    },
    
    transformVector: function(v){
        var vx = v.x, vy = v.y, vz = v.z;
        
        v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz;
        v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz;
        v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz;
    },
    
    multiply: function(a, b){
        var a11 = a.n11;
        var b11 = b.n11;
        var a21 = a.n21;
        var b21 = b.n21;
        var a31 = a.n31;
        var b31 = b.n31;
        var a12 = a.n12;
        var b12 = b.n12;
        var a22 = a.n22;
        var b22 = b.n22;
        var a32 = a.n32;
        var b32 = b.n32;
        var a13 = a.n13;
        var b13 = b.n13;
        var a23 = a.n23;
        var b23 = b.n23;
        var a33 = a.n33;
        var b33 = b.n33;
        var a14 = a.n14;
        var b14 = b.n14;
        var a24 = a.n24;
        var b24 = b.n24;
        var a34 = a.n34;
        var b34 = b.n34;
        
        this.n11 = a11 * b11 + a12 * b21 + a13 * b31;
        this.n12 = a11 * b12 + a12 * b22 + a13 * b32;
        this.n13 = a11 * b13 + a12 * b23 + a13 * b33;
        this.n14 = a11 * b14 + a12 * b24 + a13 * b34 + a14;
        
        this.n21 = a21 * b11 + a22 * b21 + a23 * b31;
        this.n22 = a21 * b12 + a22 * b22 + a23 * b32;
        this.n23 = a21 * b13 + a22 * b23 + a23 * b33;
        this.n24 = a21 * b14 + a22 * b24 + a23 * b34 + a24;
        
        this.n31 = a31 * b11 + a32 * b21 + a33 * b31;
        this.n32 = a31 * b12 + a32 * b22 + a33 * b32;
        this.n33 = a31 * b13 + a32 * b23 + a33 * b33;
        this.n34 = a31 * b14 + a32 * b24 + a33 * b34 + a34;
    },
    
    toString: function(){
        return "11: " + this.n11 + ", 12: " + this.n12 + ", 13: " + this.n13 + ", 14: " + this.n14 + "\n" + "21: " + this.n21 + ", 22: " + this.n22 + ", 23: " + this.n23 + ", 24: " + this.n24 + "\n" + "31: " + this.n31 + ", 32: " + this.n32 + ", 33: " + this.n33 + ", 34: " + this.n34;
    }
}

Matrix3D.translationMatrix = function(x, y, z){
    var m = new Matrix3D();
    
    m.n14 = x;
    m.n24 = y;
    m.n34 = z;
    
    return m;
}

Matrix3D.scaleMatrix = function(x, y, z){
    var m = new Matrix3D();
    
    m.n11 = x;
    m.n22 = y;
    m.n33 = z;
    
    return m;
}

// Apply Rotation about X to Matrix
Matrix3D.rotationXMatrix = function(theta){
    var rot = new Matrix3D();
    
    rot.n22 = rot.n33 = Math.cos(theta);
    rot.n32 = Math.sin(theta);
    rot.n23 = -rot.n32;
    
    return rot;
}

// Apply Rotation about Y to Matrix
Matrix3D.rotationYMatrix = function(theta){
    var rot = new Matrix3D();
    
    rot.n11 = rot.n33 = Math.cos(theta);
    rot.n13 = Math.sin(theta);
    rot.n31 = -rot.n13;
    
    return rot;
}

// Apply Rotation about Z to Matrix
Matrix3D.rotationZMatrix = function(theta){
    var rot = new Matrix3D();
    
    rot.n11 = rot.n22 = Math.cos(theta);
    rot.n21 = Math.sin(theta);
    rot.n12 = -rot.n21;
    
    return rot;
}

Matrix3D.rotationMatrix = function(ry, rx, rz){
    var sx, sy, sz;
    var cx, cy, cz;
    
    sx = Math.sin(rx);
    sy = Math.sin(ry);
    sz = Math.sin(rz);
    cx = Math.cos(rx);
    cy = Math.cos(ry);
    cz = Math.cos(rz);
    
    var rot = new Matrix3D();
    
    rot.n11 = cx * cz - sx * sy * sz;
    rot.n12 = -cy * sz;
    rot.n13 = sx * cz + cx * sy * sz;
    rot.n21 = cx * sz + sx * sy * cz;
    rot.n22 = cy * cz;
    rot.n23 = sx * sz - cx * sy * cz;
    rot.n31 = -sx * cy;
    rot.n32 = sy;
    rot.n33 = cx * cy;
    
    return rot;
}
