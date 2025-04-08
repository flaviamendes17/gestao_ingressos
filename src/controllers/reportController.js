const PDFDocument = require('pdfkit');

const ingressoModel = require('../models/ingressoModel');

const exportIngressoToPDF = async (req, res) => {
    try {
        console.log('Iniciando geração do PDF...');
        const ingressos = [
            { id: 1, nome: 'Shawn Mendes', data: '2025-04-01', valor: 100.00 },
            { id: 2, nome: 'Matuê', data: '2025-05-01', valor: 200.00 }
        ];
        console.log('Ingressos recuperados:', ingressos);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename=ingressos.pdf');

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text('Relatório de Ingressos', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text('Lista de ingressos:', { align: 'left' });
        doc.moveDown();

        ingressos.forEach(ingresso => {
            console.log('Processando ingresso:', ingresso);
            doc.fontSize(12).text(`ID: ${ingresso.id}`);
            doc.text(`Nome: ${ingresso.nome}`);
            doc.text(`Data: ${ingresso.data}`);
            doc.text(`Valor: R$ ${ingresso.valor}`);
            doc.moveDown();
        });

        doc.end();
        console.log('PDF gerado com sucesso!');
    } catch (error) {
        console.error("Erro ao gerar o PDF:", error.message);
        res.status(500).json({ message: 'Erro ao gerar o PDF', error });
    }
}

module.exports = { exportIngressoToPDF };