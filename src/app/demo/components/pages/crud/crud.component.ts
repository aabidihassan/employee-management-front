import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employees/employe';
import { Service } from 'src/app/models/services/service';
import { ServiceAppService } from 'src/app/service/servicesApp/service-app.service';
import { DocumentService } from 'src/app/service/documents/document.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Token } from 'src/app/models/token/token';

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

    formData !: FormData;

    photo !: File | null;
    file !: Blob;

    constructor(private serviceApp: ServiceAppService, private documentService: DocumentService,private sanitizer: DomSanitizer, private messageService: MessageService, private employesService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employesService.getAll().subscribe(data=>{
            this.employes = data;
            this.employes.forEach((e)=>{
                this.documentService.download(e.photo).subscribe(data=>{
                    this.file = new Blob([data.body!],
                        { type: `${data.headers.get('Content-Type')};charset=utf-8`}),
                        data.headers.get('File-Name')

                        const unsafeImg = URL.createObjectURL(this.file);
                        e.file= this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
                },err=>{
                    console.log("Errooooooooor");
                })
            })
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

        this.formData = new FormData();
        //this.productService.getProducts().then(data => this.products = data);

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    isAdmin():boolean{
        return Token.isAdmin();
    }

    isSuperAdmin():boolean{
        return Token.isSuperAdmin();
    }

    isUser():boolean{
        return Token.isUser();
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
        this.deleteProductDialog = true;
        this.employe = employe;
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
        this.employesService.delete(this.employe.id_employe).subscribe(data=>{
            this.deleteProductDialog = false;
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
        this.employe = new Employe();
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.deleteProductDialog = false;
        this.formData = new FormData();
        this.employe = new Employe();
    }

    selectFile(event: any): void {
        this.photo = event.target.files.item(0)!;
    }

    saveProduct() {
        this.submitted = true;
        this.formData.append("employe", JSON.stringify(this.employe));
        this.formData.append("photo", this.photo!);
        this.employesService.save(this.formData).subscribe(data=>{
            this.productDialog = false;
            this.employe = new Employe();
            this.ngOnInit();
        },err=>{
            this.formData = new FormData();
            this.photo = null;
            alert("Error, try again")
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    viewEmploye(employe : Employe){
        this.router.navigate(['employes/'+employe.matricule], { state: { employe : employe } })

    }
}
