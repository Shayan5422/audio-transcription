import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: 'upload', component: AudioUploadComponent },
  { path: 'account', component: AccountComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
