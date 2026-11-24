import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import axios from "axios";

export async function PUT(request) {
    const { direccionamientos } = await request.json() // Extraer el array de direccionamientos para programar
    const cookieStore = cookies()
    const queryToken = cookieStore.get("queryToken")
    // Sin token no se puede consultar la API: es un problema de sesión, no del servidor
    if (!queryToken?.value) {
        return NextResponse.json({ error: "La sesión expiró. Inicia sesión nuevamente" }, { status: 401 })
    }
    try {
        const ulrQuery = `${process.env.NEXT_PUBLIC_API_URL}/Programacion/${process.env.NEXT_PUBLIC_NIT}/${queryToken.value}`
        const responses = [] // respuestas
        for (const direccionamiento of direccionamientos) { // Ciclo for para enviar cada direccionamiento del array
            try {
                await axios.put(ulrQuery, direccionamiento)
                responses.push({ direccionamiento, success: true })
            } catch (err) {
                const data = err.response?.data
                if (data?.Errors) {
                    const firstError = Array.isArray(data.Errors) ? data.Errors[0] : data.Errors // si hay un error, lo almaceno
                    console.log("data error:", firstError)
                    responses.push({ direccionamiento, success: false, message: data.Message, error: firstError })
                } else {
                    // No se devuelve el objeto de axios completo: incluye la URL con el token en config
                    console.log("Error al programar el direccionamiento:", err.message)
                    responses.push({ direccionamiento, success: false, error: err.message })
                }
            }
        }
        // Si al menos un direccionamiento falló devuelve un multi-status 207
        if (responses.some(({ success }) => !success)) {
            return NextResponse.json({ responses }, { status: 207 })
        } else { // Si no devuelve un mensaje de exito
            return NextResponse.json({ message: "Programación de direccionamiento(s) exitosa" }, { status: 200 })
        }
    } catch (error) {
        console.log("Error al realizar la programación de uno o más direccionamientos", error)
        return NextResponse.json({ error: "Error al realizar la programación de uno o más direccionamientos" }, { status: 500 })
    }
}
