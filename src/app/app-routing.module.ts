import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableResolverComponent } from './table-resolver/table-resolver.component';

const routes: Routes = [
  { path: '', component: TableResolverComponent	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
