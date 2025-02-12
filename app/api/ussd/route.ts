// app/api/ussd/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Get the content type
        const contentType = request.headers.get('content-type');
        console.log('Content-Type:', contentType);

        let body: any;
        
        if (contentType === 'application/json') {
            // Parse JSON body
            body = await request.json();
        } else if (contentType === 'text/plain') {
            // Parse plain text body
            const textBody = await request.text();
            console.log('Request body:', textBody);
            
            // Assuming plain text body is in the format: sessionId,serviceCode,phoneNumber,text
            const [sessionId, serviceCode, phoneNumber, textReceived] = textBody.split(',');
            body = { sessionId, serviceCode, phoneNumber, text: textReceived };
        } else {
            throw new Error('Unsupported content type');
        }

        console.log('Parsed body:', body);
        
        const { sessionId, serviceCode, phoneNumber, text: textReceived } = body;

        if (!sessionId || !serviceCode || !phoneNumber) {
            const errorMessage = 'END Bad request data';
            console.error(errorMessage, { sessionId, serviceCode, phoneNumber });
            return new NextResponse(errorMessage, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
        }

        let response;
        const text = textReceived || "";

        if (text === '') {
            // This is the first request. Note how we start the response with CON
            response = 'CON What would you like to check\n';
            response += '1. My account\n';
            response += '2. My phone number';
        } else if (text === '1') {
            // Business logic for first option
            response = 'CON Choose account information you want to view\n';
            response += '1. Account balance\n';
            response += '2. Account number';
        } else if (text === '2') {
            // Business logic for second option
            response = `END Your phone number is ${phoneNumber}`;
        } else if (text === '1*1') {
            // Business logic for sub-option 1*1
            response = 'END Your account balance is $10';
        } else if (text === '1*2') {
            // Business logic for sub-option 1*2
            response = 'END Your account number is 123456';
        } else {
            response = 'END Invalid option';
        }

        return new NextResponse(response, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    } catch (error: any) {
        console.error('Error handling request:', error);
        return new NextResponse(`END Something went wrong: ${error.message}`, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Allow': 'POST',
        },
    });
}
