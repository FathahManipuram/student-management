
console.log(this)

function getname(){
	console.log(this.name)
}

const obj={
	name: "Fathah",
	age:24,
	method: getname,
	method2(){
	n: ()=> {
		console.log(this.name);
	}
	}
}

obj.method2().n()

