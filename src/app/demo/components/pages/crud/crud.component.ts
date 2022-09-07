import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employees/employe';
import { Service } from 'src/app/models/services/service';
import { ServiceAppService } from 'src/app/service/servicesApp/service-app.service';

@Component({
    templateUrl: './crud.component.html',
    providers: [MessageService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    services: Service[] = [];

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    employes: Employe[] = [];

    employe: Employe = new Employe();

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private serviceApp: ServiceAppService , private messageService: MessageService, private employesService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employesService.getAll().subscribe(data=>{
            this.employes = data;
            this.serviceApp.getAll().subscribe(data=>{
                this.services = data;
            },err=>{
                this.ngOnInit();
                //this.router.navigate(['/']);
            })
        },err=>{
            this.ngOnInit();
            //this.router.navigate(['/']);
        })
        //this.productService.getProducts().then(data => this.products = data);

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(employe: Employe) {
        this.employe = { ...employe };
        this.productDialog = true;
    }

    deleteProduct(employe: Employe) {
        //this.deleteProductDialog = true;
        //this.employesService.delete(employe.id_employe)
        //this.employe = { ...employe };
        this.employesService.delete(employe.id_employe).subscribe(data=>{
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        //this.employes = this.employes.filter(val => !this.selectedProducts.includes(val));
        this.employesService.delete(this.employe.id_employe).subscribe(data=>{
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        //this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        // this.employes = this.employes.filter(val => val.id_employe !== this.employe.id_employe);
        this.employesService.delete(this.employe.id_employe).subscribe(data=>{
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.employe = new Employe();
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        this.employesService.save(this.employe).subscribe(data=>{
            this.productDialog = false;
            this.employe = new Employe();
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })

        //this.employesService.save()

        // if (this.product.name?.trim()) {
        //     if (this.product.id) {
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
        //         this.products[this.findIndexById(this.product.id)] = this.product;
        //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        //     } else {
        //         this.product.id = this.createId();
        //         this.product.code = this.createId();
        //         this.product.image = 'product-placeholder.svg';
        //         // @ts-ignore
        //         this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
        //         this.products.push(this.product);
        //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        //     }

        //     this.products = [...this.products];
        //     this.productDialog = false;
        //     this.product = {};
        // }
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    viewEmploye(employe : Employe){
        this.router.navigate(['employes/'+employe.matricule], { state: { employe : employe } })

    }
}
