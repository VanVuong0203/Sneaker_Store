import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    products: Product[] = [];
    loading = true;

    constructor(private svc: ProductService) { }

    ngOnInit() {
        this.svc.getProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Lỗi khi tải sản phẩm:', err);
                this.loading = false;
            }
        });
    }
}
