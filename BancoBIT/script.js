let clientes=[]
let indiceCliente = 0



class cliente {
    constructor(nombre,saldo){
        this.nombre=nombre
        this.saldo=parseFloat(saldo)
    }
// metodos
consignar(monto){
    this.saldo += parseFloat(monto)
}
retirar(monto){
    this.saldo -= parseFloat(monto)    
}

}

class operaciones {

almacenar(arregloClientes){
    localStorage.setItem("clientesJson", JSON.stringify(arregloClientes)) 
}   

reestablecerClientes(){
    let ArrayClientes=[]
    let clientesAlmacenados = JSON.parse(localStorage.getItem("clientesJson"))
    clientesAlmacenados.forEach( (element) => {
        const newCliente = new cliente( element.nombre,element.saldo)
        ArrayClientes.push(newCliente)
    });
    ArrayClientes[0].nombre="No Logueado"
    ArrayClientes[0].saldo = 0
    indiceCliente = 0
    
    return ArrayClientes
}

acceder(clienteBuscado){
    // console.log(clienteArray)
    let flag=false
    let indice = -1
    clientes.forEach( (elemento,index) => {
        if (elemento.nombre === clienteBuscado ) {
            flag=true
            indice=index
            document.querySelector('#nombre-cliente').innerHTML= `Cliente: ${elemento.nombre} `
            document.querySelector('#forma-operaciones').className='show'
        } 
    });
    if (flag) {
        document.querySelector('#valor-saldo').value=clientes[indice].saldo
        return indice    
    } else{
        alert("cliente no encontrado")
        return 0
    }
}
}


function adicionarCliente(event) {
    event.preventDefault()
    event.stopPropagation()
    //const form = event.target
    //const inputNombre = form.querySelector('input#usuario')
    //const inputSaldo = form.querySelector('input#saldo')

    const inputNombre = document.querySelector('input#usuario').value
    const inputSaldo = document.querySelector('input#saldo').value
 

    const newCliente = new cliente(inputNombre,inputSaldo)
    clientes.push(newCliente)
    const nuevaOperacion = new operaciones()
    nuevaOperacion.almacenar(clientes)
    inputNombre.value = ''
    inputSaldo.value = ''
}


function accion(event) {
    event.preventDefault()
    event.stopPropagation()
    console.log(event)
    if (event.target.id==='retirar') {
        clientes[indiceCliente].retirar(document.querySelector('#valor').value)
        document.querySelector('#valor-saldo').value=clientes[indiceCliente].saldo
        setTimeout(function () {
            indiceCliente = 0
            document.querySelector('input#usuario').value=''
            document.querySelector('input#saldo').value=''
            document.querySelector('#valor-saldo').value=''
            document.querySelector('#valor').value=''
            document.querySelector('#forma-operaciones').className='hide'
            document.querySelector('#nombre-cliente').innerHTML= `Cliente: `
        },10000)
        
               
    }
    if (event.target.id==='consignar') {
        clientes[indiceCliente].consignar(document.querySelector('#valor').value)
        document.querySelector('#valor-saldo').value=clientes[indiceCliente].saldo
        setTimeout(function () {
            indiceCliente = 0
            document.querySelector('input#usuario').value=''
            document.querySelector('input#saldo').value=''
            document.querySelector('#valor-saldo').value=''
            document.querySelector('#valor').value=''
            document.querySelector('#forma-operaciones').className='hide'
            document.querySelector('#nombre-cliente').innerHTML= `Cliente: `
        },10000)

        
        
    }
    const nuevaOperacion = new operaciones()
    nuevaOperacion.almacenar(clientes)
}



const form = document.querySelector('#form')
form.addEventListener('submit', () => adicionarCliente(event))

const botonRetirar = document.querySelector('#retirar')
botonRetirar.addEventListener('click', () => accion(event))

const botonConsignar = document.querySelector('#consignar')
botonConsignar.addEventListener('click', () => accion(event))

const nuevaOperacion = new operaciones()
document.addEventListener("DOMContentLoaded",() => {
    document.querySelector('#forma-operaciones').className='hide'
    clientes = nuevaOperacion.reestablecerClientes() 
})

const botonAdicionar = document.querySelector('#adicionar')
botonAdicionar.addEventListener('click', () => adicionarCliente(event))

const botonAcceso = document.querySelector('#acceder')
botonAcceso.addEventListener('click', () => indiceCliente=nuevaOperacion.acceder(document.querySelector('input#usuario').value))


