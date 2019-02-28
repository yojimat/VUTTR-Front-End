import React from 'react';
import './Vuttr.css';

//Criador da Lista
const mapListView = (lista, abrirModalDelete) => {
  return lista.map((item,i) => {
    const tagsList = item.tags.map((tag, i) => {
      return <small key={i}>#{tag}{" "}</small>
    })

    return(
      <li key={i}>
        <h1><a href={item.link}>{item.title}</a></h1>
        <p>{item.description}</p>
        <p>{tagsList}</p>
        <button 
          type="button" 
          onClick={ () => abrirModalDelete(item.id)} 
          id={item.id}
        >
          <span role="img" aria-label="plus">&#x2718;</span> Remover?
        </button>
      </li>
      );
  });
};

const Vuttr = React.forwardRef(({...props }, ref) => {
  const { abrirModal, abrirModalDelete, toolsList, pesquisaFiltradasTools, toggleTagFiltro} = props;

  return(
    <div className="App">
      <header>
        <h1>VUTTR</h1>
        <h2>Very Useful Tools to Remember</h2>
      </header>
      <section>
        <input 
          type="search" 
          placeholder="Pesquise aqui!"
          ref={node => ref = node}
          value={ref.value}
          onChange={() => pesquisaFiltradasTools(ref.value)}
        />
        {' '}
        <label>
          <input 
          type="checkbox"
          onChange={() => toggleTagFiltro(ref.value)}
          />
          Procurar com #tags?
        </label>
        {' '}
        <button type="button" onClick={ abrirModal }>
          <span role="img" aria-label="plus">➕</span> Adicionar
        </button>
        <br />
        <ul>
          {mapListView(toolsList, abrirModalDelete)}
        </ul>
      </section>
    </div>
  );
});
export default Vuttr;