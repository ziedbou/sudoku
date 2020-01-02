import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-resolver',
  templateUrl: './table-resolver.component.html',
  styleUrls: ['./table-resolver.component.scss']
})
export class TableResolverComponent implements OnInit {

  constructor() { }

  table = [];
  
  sudokuGroup = 3;
  permissionValues = [];
  
  buildArray(){
    let arr = [];
    for(let i = 0; i<this.sudokuGroup*3;i++){
      arr.push(null)
    }
    return arr;
  }

  ngOnInit() {
    for (let i = 0; i < 3 * this.sudokuGroup; i++) {
      this.table[i] = this.buildArray();
      this.permissionValues[i] = this.buildArray();
    }
    this.table[0][0] = 8;
    this.table[0][1] = 2;
    this.table[0][2] = 4;
    this.table[0][4] = 5;
    this.table[0][5] = 3;
    this.table[0][8] = 9;

    this.table[1][3] = 9;
    this.table[1][5] = 4;
    this.table[1][6] = 2;

    this.table[2][3] = 8;
    this.table[2][8] = 7;

    this.table[3][0] = 6;
    this.table[3][1] = 3;
    this.table[1][4] = 1;
    this.table[2][4] = 6;
    this.table[3][2] = 9;
    this.table[3][4] = 2;
    this.table[3][8] = 4;
    
    this.table[5][0] = 7;
    this.table[5][4] = 8;
    this.table[5][6] = 9;
    this.table[5][7] = 2;
    this.table[5][8] = 3;

    this.table[6][0] = 4;
    this.table[6][5] = 6;

    this.table[7][2] = 7;
    this.table[7][3] = 4;
    this.table[7][5] = 5;
    
    this.table[8][0] = 9;
    this.table[8][3] = 2;
    this.table[8][4] = 3;
    this.table[8][6] = 4;
    this.table[8][7] = 7;


    

  }

  calculer() {
    //find permissions
    for(let m=0;m<20; m++){
      for (let i = 0; i < 3 * this.sudokuGroup; i++) {
        for (let j = 0; j < 3 * this.sudokuGroup; j++) {
          if(!this.table[i][j])
            this.permission(i,j)
        }
      }
  
      this.logique2();
      this.logique1()
    }


  }


  /**
   * PERMISSION LINE COLUMN
   * @param lign 
   * @param column 
   */
  permission(lign, column) {
    let existedValues = [];
    let numbers = [1,2,3,4,5,6,7,8,9];

    //find values in same lign
    for (let i = 0; i < 3 * this.sudokuGroup; i++) {
      if (this.table[lign][i]   && existedValues.indexOf(this.table[lign][i]) == -1) {
        existedValues.push(this.table[lign][i]);
      }
    }

    //find values in same column
    for (let i = 0; i < 3 * this.sudokuGroup; i++) {
      if (this.table[i][column]   && existedValues.indexOf(this.table[i][column]) == -1) {
        existedValues.push(this.table[i][column]);
      }
    }

    //find values in same group
    let x = lign - (lign%3);
    let y = column - (column%3);
    for(let i=x; i<x+3; i++){
      for(let m = y; m<y+3;m++){
        if(this.table[i][m]  && existedValues.indexOf(this.table[i][m]) == -1){
          existedValues.push(this.table[i][m])
        }
      }
    }

    this.permissionValues[lign][column] = this.matching(numbers, existedValues);

  }

  /**
   * 



   */
  logique1(){
    
  
    for(let c = 0; c<3; c++){
      for(let m = 0; m<3; m++){
        for(let i = m*3; i<(m+1)*3; i++){
          for(let k = 3*c; k<(c+1)*3;k++){
            console.log(this.table[i][k])
          } 
        }
        console.log('---------')
    }
  }
    

  }

  logique2(){
      for (let i = 0; i < 3 * this.sudokuGroup; i++) {
        for (let j = 0; j < 3 * this.sudokuGroup; j++) {
          if(!this.table[i][j] && this.permissionValues[i][j] ){
            if(this.permissionValues[i][j].length == 1){
              this.table[i][j] = this.permissionValues[i][j][0];
              this.permissionValues[i][j] = null;
            }
      
          }
          else if(this.table[i][j]){
            this.permissionValues[i][j] = null;
          }
        }
      }  

  }


  /**
   * MATCHING TWO ARRAYS
   * @param arr1 
   * @param arr2 
   */
  matching(arr1, arr2) {
    var ret = [];
    for (var i in arr1) {
      if (arr2.indexOf(arr1[i]) == -1) {
        ret.push(arr1[i]);
      }
    }
    return ret;
  }
}
