/**
 * Created by �Źֵ��ǹ� on 2016/11/5.
 */
window.onload = function(){
    var dom = document.getElementById("clock");
    var clk = dom.getContext('2d');//��ȡ��ͼ����
    width = clk.canvas.width;
    height = clk.canvas.height;
    var r  = width / 2;
    var rem = width/400;  //����һ�����������һ����ϸ�������Ա��ڸı仭����Сʱ�������ܵ���ȫ�ִ�ϸ��С
    function drawBackground(){
        clk.save();
        clk.translate(r,r);//�ض�������ԭ��Ϊ��ͼ����
        clk.beginPath();
        clk.lineWidth = 10*rem;
        clk.arc(0,0,r-clk.lineWidth/2,0,2*Math.PI,false);//������0��0Ϊ���ģ�r-5Ϊ�뾶��0����Ϊ��ʼ�Ƕȣ�2��Ϊ�����ǣ�˳ʱ�뻭Բ
        clk.stroke();//���ƶ���õ�·��
        var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
        clk.font = 18*rem+'px Arial';
        clk.textAlign = "center"; //ʹ�ı��������Ҷ���
        clk.textBaseline = "middle"
        hourNumbers.forEach(function(number,i){
            var rad = 2*Math.PI/12*i; //���ֶ�Ӧ�Ļ���
            var x = Math.cos(rad)*(r-30*rem);   //���ֵ�x��
            var y = Math.sin(rad)*(r-30*rem);     //���ֵ�y��
            clk.fillText(number,x,y)
        })
        for(i=0;i<=60;i++){
            var rad = 2*Math.PI/60*i;
            var x = Math.cos(rad)*(r-16*rem);
            var y = Math.sin(rad)*(r-16*rem);
            clk.beginPath();
            if(i%5==0){
                clk.fillStyle = "#000"
                clk.arc(x,y,2*rem,0,2*Math.PI,false);  //�����Сʱ��Ӧ�ĵ㣬��Ϊ��ɫ
            }else{
                clk.fillStyle = "#ccc"
                clk.arc(x,y,2*rem,0,2*Math.PI,false);  //����Ƿ��Ӷ�Ӧ�ĵ㣬��Ϊ��ɫ
            }
            clk.fill();
        }
    }

    function drawHours(hour,minute){
        clk.save();
        clk.beginPath();
        var rad = 2*Math.PI/12*hour;
        var mrad = 2*Math.PI/12/60*minute
        clk.rotate(rad+mrad);
        clk.lineWidth = 5*rem;
        clk.lineCap = 'round';
        clk.moveTo(0,5*rem);
        clk.lineTo(0,-r/2+10*rem);
        clk.stroke();
        clk.restore();
    }

    function drawMinutes(minute){
        clk.save();
        clk.beginPath();
        var rad = 2*Math.PI/60*minute;
        clk.rotate(rad);
        clk.lineWidth = 3*rem;
        clk.lineCap = 'round';
        clk.moveTo(0,5*rem);
        clk.lineTo(0,-r/2-10*rem);
        clk.stroke();
        clk.restore();
    }

    function drawSeconds(second){
        clk.save();
        clk.beginPath();
        clk.fillStyle = "#f00";
        var rad = 2*Math.PI/60*second;
        clk.rotate(rad);
        clk.moveTo(-2*rem,20*rem);
        clk.lineTo(2*rem,20*rem);
        clk.lineTo(1,-r+30*rem);
        clk.lineTo(-1,-r+30*rem);
        clk.fill();
        clk.restore();
    }

    function drawDot(){      //��ʱ�����ĵ�ԭ��
        clk.beginPath();
        clk.fillStyle = "#fff";
        clk.arc(0,0,3*rem,0,2*Math.PI,false);
        clk.fill();
    }

    function draw(){
        clk.clearRect(0,0,width,height);
        drawBackground();
        drawDot();
        var now = new Date();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        drawHours(hour,minute);
        drawMinutes(minute);
        drawSeconds(second);
        clk.restore();
    }
    draw();
    setInterval(draw,1000)
};