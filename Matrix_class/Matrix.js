class Matrix{

  constructor(col, row, data){
    this.col = col;
    this.row = row;
    if (data == null){
      this.data = [];
      this.initialyze();
    }
    else{
      this.data = data;
    }
  }

  initialyze(){
    for(let i = 0; i < this.row; i++){
      this.data[i] = [];
      for(let j = 0; j < this.col; j++){
        this.data[i][j] = 0;
      }
    }
  }

  add(n){
    if(n instanceof Matrix){
      this = Matrix.add(this, n);
    }
    else{
      for(let i = 0; i < this.row; i++){
        for(let j = 0; j < this.col; j++){
          this.data[i][j] += n;
        }
      }
    }
  }

  static add(m1, m2){
    let result = [];
    if (m1.row != m2.row || m1.col != m2.col){
      console.log("Addition impossible : Matrices de taille différentes");
    }
    else{
      for(let i = 0; i < m1.row; i++){
        result[i] = [];
        for(let j = 0; j < m1.col; j++){
          result[i][j] = m1.data[i][j] + m2.data[i][j];
        }
      }
      return new Matrix(result.length, result[0].length, result);
    }
  }

  determinant(){

  }

  multiply(n){

  }

  static multiply(m1, m2){

  }

  isDiagonalizable(){

  }

  inversion(){
    
  }

  // static test(){
  //   let m1 = new Matrix(2,3, null);
  //   let m2 = new Matrix(2,3, null);
  //   let m3 = new Matrix(2,4, null);
  //
  //   m1.add(2);
  //   m2.add(3);
  //   m3.add(5);
  //
  //   Matrix.add(m2,m3);
  //
  //   console.table((Matrix.add(m1,m2)).data);
  //
  // }
}
