import React from 'react';
import LoadingComponent from "./LoadingComponent";
import Link from "../helpers/icones/Link.svg";
import './Vuttr.css';

const mapListView = (lista, abrirModalDelete) => {
  return lista.map((item,i) => {
    const tagsList = item.tags.map((tag, i) => {
      return <small key={i}>#{tag}{" "}</small>
    })

    return(
      <li key={i}>
        <h3 className="azul linkTitle">
          <a href={item.link} 
            target="blank"
            className="azul link"
          >
            <img src={Link} alt="check" height="22" width="52"/> 
          </a>
          {' '}
          {item.title}
        </h3>
        <p>{item.description}</p>
        <p>{tagsList}</p>
        <button 
          type="button" 
          onClick={ () => abrirModalDelete(item)} 
          id={item.id}
          className="grow br2 ba ph3 pv2 mb2 dib bg-remove vermelho"
        >
          <span role="img" aria-label="plus">&#x2718;</span> Remover
        </button>
        <hr className="o-30"/>
      </li>
      );
  });
};

const Vuttr = React.forwardRef(({...props }, ref) => {
  const { abrirModal, 
    abrirModalDelete, 
    toolsList, 
    pesquisaFiltradasTools, 
    toggleTagFiltro,
    isLoadingLista,
    respostaLista
  } = props;

  return(
    <div className="App">
      <header>
        <h1 className="ink mt4 mb0 i fw1">VUTTR</h1>
        <h2 className="ink mt2 mb4 ttu tracked">Very Useful Tools to Remember</h2>
      </header>
      <section>
        <form>
          <input 
            type="search" 
            placeholder="Pesquise aqui…"
            ref={node => ref = node}
            value={ref.value}
            onChange={() => pesquisaFiltradasTools(ref.value)}
            className="mb2 pesquisaInput br1"
            aria-label="Pesquisa"
          />
          {' '}
          <label className="lh-copy container ml3">Procurar com #tags?
            <input 
            type="checkbox"
            onChange={() => toggleTagFiltro(ref.value)}
            />
            <span className="checkmark br1"></span>
          </label>
        </form>
        <br />
        <button className="grow br2 ph3 pv2 mb2 dib bg-add azul" 
          type="button" 
          onClick={ abrirModal }
        >
          <span role="img" aria-label="plus">➕</span> Adicionar Tool
        </button>
        <br />
        <article className="bg-branco-escuro w-50 center mb4 o-90 ba b--black-20 br2 pr4 shadowBox">
          {isLoadingLista === true ?
            <LoadingComponent 
              respostaFetchUsuario={ respostaLista }
              fecharModal={null}
            />
            :
            toolsList.length !== 0 ?
              <ul>{ mapListView(toolsList, abrirModalDelete) }</ul>
              :
              <div className="pa2">
                <span>Lista vazia.</span>
              </div>
          }  
        </article>
      </section>
    </div>
  );
});
export default Vuttr;