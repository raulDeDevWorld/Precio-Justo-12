'use client'
import { useState } from 'react'
import { useUser } from '../../../context/Context.js'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Label from '@/components/Label'
import Checkbox from '@/components/Checkbox'
import { writeUserData, readUserData} from '@/supabase/utils'


import Button from '../../../components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {
    const router = useRouter()

    const { user, userDB, setUserData, setUserSuccess } = useUser()
    const [state, setState] = useState({})

    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const inputRefPhone = useMask({ mask: '+ 591 _ ___ ___', replacement: { _: /\d/ } });
    const inputRefWhatsApp = useMask({ mask: '+ 591 __ ___ ___', replacement: { _: /\d/ } });

    function onChangeHandler(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    function onChangeHandlerCheck(e) {
        setState({ ...state, [e.target.name]: e.target.checked })
    }
    function onClickHandler(name, value) {
        setState({ ...state, [name]: value })
    }
    function save(e) {
        e.preventDefault()
        writeUserData('Clinica', {...state, uuid: user.uuid}, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil' )
        router.push('Clinica/Perfil')
    }


    return (
        <form >
            <h3 className='text-center pb-3'>Agregar Perfil</h3>
            <div className="w-full flex justify-center">
                <label htmlFor="file" className="block flex justify-center items-center w-[100px] h-[100px] bg-white border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 rounded-[100px]" >Subir Imagen</label>
                <input className="hidden" id='file' type="file" />
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <Label htmlFor="">Nombre de la clínica</Label>
                    <Input type="text" name="nombre" onChange={onChangeHandler} />
                </div>
                <div>
                    <Label htmlFor="">Ciudad</Label>
                    <Select arr={['La Paz', 'Cochabamba', 'Santa Cruz']} name='ciudad' click={onClickHandler} />
                </div>

                <div>
                    <Label htmlFor="">Dirección</Label>
                    <Input type="text" name="direccion" onChange={onChangeHandler} />
                </div>
                <div>
                    <Label htmlFor="">Numero de tarjeta</Label>
                    <Input type="text" reference={inputRefCard} name="numero de tarjeta" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
                </div>
                <div>
                    <div className='w-full flex justify-between'>
                        <div className='w-5/12'>
                            <Label htmlFor="">Fecha</Label>
                            <Input reference={inputRefDate} name="fecha de tarjeta" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
                        </div>
                        <div className='w-5/12'>
                            <Label htmlFor="">CVC</Label>
                            <Input reference={inputRefCVC} name="cvc" styled={{ textAlign: 'center' }} onChange={onChangeHandler} />
                        </div>
                    </div>
                </div>
                <div>
                    <Label htmlFor="">Teléfono</Label>
                    <Input type="text" name="telefono" reference={inputRefPhone}  onChange={onChangeHandler} />
                </div>
                <div>
                    <Label htmlFor="">Whatsapp</Label>
                    <Input type="text" name="whatsapp" onChange={onChangeHandler} reference={inputRefWhatsApp} />
                </div>
            </div>
            <div className='flex w-full justify-around'>
                <Button theme='Success' >Ver Vista Cliente</Button>
                <Button theme='Primary' click={save}>Guardar</Button>
            </div>
        </form>
    )
}

export default  WithAuth(Home)
