import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

const App = () => {
    //#region  Prevent resize from keyboard
    let vData = { vh: window.innerHeight, vw: window.innerWidth }
    document.documentElement.style.setProperty('--vh', `${(vData.vh * 0.01)}px`);

    window.addEventListener('resize', () => {
        const _vData = { vh: window.innerHeight, vw: window.innerWidth }
        const cambiow = vData.vw !== _vData.vw
        const cambioh = vData.vh !== _vData.vh
        const esMayor = vData.vh < _vData.vh
        const diff = vData.vh - _vData.vh
        const cambioFuerte = diff > 100
        // console.log(`cambio w: ${cambiow} | cambio h: ${cambioh} | es mayor:${esMayor} | diff: ${diff} | cambio fuerte: ${cambioFuerte}`)
        if (cambiow || (cambioh && esMayor) || !cambioFuerte) {
            // console.log(`Cambio el tamaño de la pantalla`, vData.vh, _vData.vh)
            vData = _vData
            document.documentElement.style.setProperty('--vh', `${(_vData.vh * 0.01)}px`);
        }
    });
    //#endregion

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default App