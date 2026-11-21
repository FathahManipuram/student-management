function ad(a: number | string){
    if(typeof a==="number"){
		return a.toFixed()
	}

	return a.toUpperCase()
}
function divide({dividend, divisor}: {dividend: number, divisor: number}){
    return dividend/ divisor
}

console.log(divide({dividend:10, divisor:2}))



type Add1= (a: number, b: number)=> number

const add2 : Add1= (a, b)=> {
    return a+b
}

add2(10,20)


let xy: unknown = "hello"

console.log(((xy as unknown) as number).length)