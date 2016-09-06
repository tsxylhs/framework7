package cn.com.stu.test;
class Animal{
	void cry(){}
}
class dag extends  Animal{
	void cry(){
		System.out.println("hahahahaha");
	}
}
public class Test {
public static void main(String[] args) {
	Animal dog=new dag();
	dog.cry();
}
}
