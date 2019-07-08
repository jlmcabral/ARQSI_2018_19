import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home/Home';
import ConfigurarCatalogo from './pages/configurarcatalogo/ConfigurarCatalogo';
import AreaCliente from './pages/areacliente/AreaCliente';

import Produtos from './pages/produtos/Produtos';
import CreateProduto from './pages/produtos/create/CreateProduto';
import EditProduto from './pages/produtos/edit/EditProduto';

import Categorias from './pages/categorias/Categorias';
import CreateCategoria from './pages/categorias/create/CreateCategoria';
import EditCategoria from './pages/categorias/edit/EditCategoria';

import Dimensoes from './pages/dimensoes/Dimensoes';
import CreateDimensao from './pages/dimensoes/create/CreateDimensao';
import EditDimensao from './pages/dimensoes/edit/EditDimensao';

import Materiais from './pages/materiais/Materiais';
import CreateMaterial from './pages/materiais/create/CreateMaterial';
import EditMaterial from './pages/materiais/edit/EditMaterial';

import Acabamentos from './pages/acabamentos/Acabamentos';
import CreateAcabamento from './pages/acabamentos/create/CreateAcabamento';
import EditAcabamento from './pages/acabamentos/edit/EditAcabamento';

import Restricoes from './pages/restricoes/Restricoes';
import CreateRestricao from './pages/restricoes/create/CreateRestricao';
import EditRestricao from './pages/restricoes/edit/EditRestricao';

import NotFound from './pages/not-found/NotFound';
import Header from './shared/components/header/Header';
// import SideBar from './shared/components/side-bar/SideBar';

//NodeJS
import ItemProdutos from './pages/node/itemProdutos/ItemProdutos';
import CatalogoItemProdutos from './pages/node/itemProdutos/catalogo/CatalogoItemProdutos';
import CreateItemProduto from './pages/node/itemProdutos/create/CreateItemProduto';
import EditItemProduto from './pages/node/itemProdutos/edit/EditItemProduto';

import Encomendas from './pages/node/encomendas/Encomendas';
import CreateEncomenda from './pages/node/encomendas/create/CreateEncomenda';
import EditEncomenda from './pages/node/encomendas/edit/EditEncomenda';


class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        {/* <SideBar /> */}
        <main>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/configurarcatalogo" component={ConfigurarCatalogo} />
              <Route exact path="/areacliente" component={AreaCliente} />

              <Route exact path="/produtos" component={Produtos} />
              <Route exact path="/produtos/novo" component={CreateProduto} />
              <Route exact path="/produtos/editar/:id" component={EditProduto} />

              <Route exact path="/categorias" component={Categorias} />
              <Route exact path="/categorias/novo" component={CreateCategoria} />
              <Route exact path="/categorias/editar/:id" component={EditCategoria} />

              <Route exact path="/dimensoes" component={Dimensoes} />
              <Route exact path="/dimensoes/novo" component={CreateDimensao} />
              <Route path="/dimensoes/editar/:id" component={EditDimensao} />

              <Route exact path="/materiais" component={Materiais} />
              <Route exact path="/materiais/novo" component={CreateMaterial} />
              <Route exact path="/materiais/editar/:id" component={EditMaterial} />

              <Route exact path="/acabamentos" component={Acabamentos} />
              <Route exact path="/acabamentos/novo" component={CreateAcabamento} />
              <Route exact path="/acabamentos/editar/:id" component={EditAcabamento} />

              <Route exact path="/restricoes" component={Restricoes} />
              <Route exact path="/restricoes/novo" component={CreateRestricao} />
              <Route exact path="/restricoes/editar/:id" component={EditRestricao} />

              // node
              <Route exact path="/itemproduto" component={ItemProdutos} />
              <Route exact path="/itemprodutocatalogo" component={CatalogoItemProdutos} />
              <Route exact path="/itemproduto/novo" component={CreateItemProduto} />
              <Route exact path="/itemproduto/editar/:id" component={EditItemProduto} />

              <Route exact path="/encomendas" component={Encomendas} />
              <Route exact path="/encomendas/novo" component={CreateEncomenda} />
              <Route exact path="/encomendas/editar/:id" component={EditEncomenda} />

              <Route component={NotFound} />
          </Switch>
        </main>
      </Fragment>
    );
  }
}

export default App;
