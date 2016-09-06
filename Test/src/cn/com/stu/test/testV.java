package cn.com.stu.test;

class test {


	void tiji(int h, int r,int e) {

	}

	void tiji(int h, int w, double pi2) {

	}

}

class yuan extends test{
	void tiji(int h, int r, double pi) {
		System.out.println("圆的体积：" + h * r * r * pi);
	}
}

class fang extends test{

	void tiji(int w, int s, int h) {
		System.out.println("方的体积：" + h * w * s);
	}
}

class testV {

	public static void main(String[] args) {
		double pi = 3.14;
		test fangs=new fang();
		fangs.tiji(2,3,4);
		test yuan=new yuan();
		yuan.tiji(2, 3, pi);
		

	}

}
