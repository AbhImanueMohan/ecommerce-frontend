import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
//OnInit used to view at glance
export class ViewProductComponent implements OnInit {

  productId:any
  product: any=[]

  constructor(private viewActivatedRoute:ActivatedRoute, private api:ApiService){}
  //get path parameter from route
ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data.id);// display the id only
      this.productId=data.id
      //view particular product details
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        console.log(result);//array of products
        this.product=result
        

      })
      
      
    })
}

// addto wishlist

addToWishlist(){
  const {id,title,price,image}=this.product   //destructuring
  this.api.addtowishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
  },
  (result:any)=>{
    alert(result.error);
      })
    }
// add to cart
addToCart(product:any){

  // add quantity 1 to product object
  Object.assign(product,{quantity:1})
  console.log(product);
  this.api.addtocart(product).subscribe((result:any)=>{
    this.api.cartCount()

    alert(result)
  },
  (result:any)=>{
    alert(result.error)
  }
  )
  
}

}
