import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProvinceComponent } from './entities/province/province.component';
import { ProvinceService } from './entities/province/province.service';
import { DistrictComponent } from './entities/district/district.component';
import { CantonComponent } from './entities/canton/canton.component';
import { PlacesComponent } from './entities/places/places.component';
import { CategoriesComponent } from './entities/categories/categories.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormComponent } from './entities/province/form.component';
import { FormsModule } from '@angular/forms';
import { FormCantonComponent } from './entities/canton/form-canton.component';
import { CantonService } from './entities/canton/canton.service';
import { FormDistrictComponent } from './entities/district/form-district.component';
import { FormCategoriesComponent } from './entities/categories/form-categories.component';
import { FormPlacesComponent } from './entities/places/form-places.component';
import { DistrictService } from './entities/district/district.service';
import { PlacesService } from './entities/places/places.service';
import { CategoriesService } from './entities/categories/categories.service';
import { LoginComponent } from './user/login.component';
import { AuthGuard } from './user/guards/auth.guard';
import { RoleGuard } from './user/guards/role.guard';
import { TokenInterceptor } from './user/interceptors/token.interceptor';
import { AuthInterceptor } from './user/interceptors/auth.interceptor';
import { SubCategoryComponent } from './entities/sub-category/sub-category.component';
import { FormSubCategoryComponent } from './entities/sub-category/form-sub-category.component';
import { SubCategoryService } from './entities/sub-category/sub-category.service';
import { DetailComponent } from './entities/places/detail/detail.component';
const routes: Routes = [
  {path: '', redirectTo: 'app', pathMatch: 'full'},
  {path:'province', component: ProvinceComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path:'subCategory', component: SubCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path:'district', component: DistrictComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path:'canton', component: CantonComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path:'places', component: PlacesComponent},
  {path:'categories', component: CategoriesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path:'formSubCategory', component: FormSubCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path:'subCategory/formSubCategory/:id', component: FormSubCategoryComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'province/form/:id', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'formCanton', component: FormCantonComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'canton/formCanton/:id', component: FormCantonComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'formDistrict', component: FormDistrictComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'district/formDistrict/:id', component: FormDistrictComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'formPlaces', component: FormPlacesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'places/formPlaces/:id', component: FormPlacesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'formCategories', component: FormCategoriesComponent},
  {path: 'categories/formCategories/:id', component: FormCategoriesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProvinceComponent,
    DistrictComponent,
    CantonComponent,
    PlacesComponent,
    CategoriesComponent,
    FormComponent,
    FormCantonComponent,
    FormDistrictComponent,
    FormCategoriesComponent,
    FormPlacesComponent,
    LoginComponent,
    SubCategoryComponent,
    FormSubCategoryComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProvinceService,CantonService,DistrictService,PlacesService,CategoriesService,SubCategoryService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
