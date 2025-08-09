import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private apiUrl = 'http://localhost:5000/api/products';
    private imageBaseUrl = 'http://localhost:5000';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            map(products => products.map(p => ({
                ...p,
                imageUrl: p.image?.startsWith('http')
                    ? p.image
                    : `${this.imageBaseUrl}${p.image}`
            })))
        );
    }

    getProductById(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
            map(p => ({
                ...p,
                imageUrl: p.image?.startsWith('http')
                    ? p.image
                    : `${this.imageBaseUrl}${p.image}`
            }))
        );
    }
}
