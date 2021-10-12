// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import CreateGame from './components/CreateGame/CreateGame';
import Inicio from './components/inicio/Inicio';

configure({ adapter: new Adapter() });

describe('<Nav />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Inicio />)
    })

    it('Deberia renderizar un boton', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('Deberia renderizar un <Link>', () => {
        expect(wrapper.find(NavLink)).toHaveLength(1);

    });
    it('El Link debe cambiar la ruta hacia "/app/home/1"', () => {
        expect(wrapper.find(Link).prop('to')).toEqual('/app/home/1');
    });
})
// describe('<CreateGame />', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = shallow(<CreateGame />);
//     })
//     it('Renderiza un <form>', () => {
//         expect(wrapper.find('form')).toHaveLength(1)
//     })

//     it('Renderiza un label con el texto "Name"', () => {
//         expect(wrapper.find('label').at(0).text()).toEqual('Name: ');
//     })

//     it('Renderiza un textarea con la propiedad "name" igual a "description"', () => {
//         expect(wrapper.find('textarea[name="description"]')).toHaveLength(1);
//     })

//     it('Renderiza un label con el texto "Release Date"', () => {
//         expect(wrapper.find('label').at(2).text()).toEqual('Release Date: ');
//     })
//     it('Renderiza un input de tipo date', () => {
//         expect(wrapper.find('input[type="date"]')).toHaveLength(1);
//     })

//     it('Renderiza un label con el texto "Rating"', () => {
//         expect(wrapper.find('label').at(3).text()).toEqual('Rating: ');
//     })

//     it('Renderiza un input con la propiedad "name" igual a "rating"', () => {
//         expect(wrapper.find('input[name="rating"]')).toHaveLength(1);
//     })

//     it('Renderiza un boton con el "type" "submit"', () => {
//         expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
//     })
// });
