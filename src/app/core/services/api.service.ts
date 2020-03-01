import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { IRequestOptions } from '@interfaces';
import Swal from 'sweetalert2';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api = environment.serverUrl + '/';

  constructor(public http: HttpClient) { }

  /**
   * GET request
   * @param endPoint it doesn't need / in front of the end point
   * @param options options of the request like headers, body, etc.
   */
  public get < T >(endPoint: string, options ?: IRequestOptions): Observable < T > {
    return this.http.get < any > (this.api + endPoint, options)
      .pipe(map(response => response?.data));
  }

  /**
   * POST request
   * @param endPoint end point of the api
   * @param params body of the request.
   * @param options options of the request like headers, body, etc.
   */
  public post < T >(endPoint: string, params: object, options ?: IRequestOptions): Observable < T > {
    return this.http.post < T > (this.api + endPoint, params, options);
  }

  /**
   * PUT request
   * @param endPoint end point of the api
   * @param params body of the request.
   * @param options options of the request like headers, body, etc.
   */
  public put < T >(endPoint: string, params: object, options ?: IRequestOptions): Observable < T > {
    return this.http.put < T > (this.api + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param endPoint end point of the api
   * @param options options of the request like headers, body, etc.
   */
  public delete < T >(endPoint: string, options ?: IRequestOptions): void {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#73ae42',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.delete < T > (this.api + endPoint, options).subscribe(
          response => {
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success'
            );
          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Ha ocurrido un error inesperado',
              icon: 'error',
              showConfirmButton: false,
              timer: 2500
            });
          }
        );
      }
    });

  }
}
