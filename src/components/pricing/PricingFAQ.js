import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';

const faqs = [
	{
		question: 'What is an operator?',
		answer:
			'A operator is a user that can only execute script, flows and apps, but not create and edit them.'
	},
	{
		question: 'What is an execution?',
		answer:
			'The single credit-unit is called a "execution". An execution corresponds to a single job whose duration is less than 1s. For any additional seconds of computation, an additional computation is accounted for. The number of executions of a flow corresponds to the sum of the executions of each step as seconds, considered as one script execution of that same time (time in sleep or doing state transition are not accounted). For apps, a backend script execution is considered as a script execution. As apps frontend scripts execute on browsers, they are not taken into account. Jobs are executed on one powerful virtual CPU with 2Gb of memory. Most jobs will take less than 200ms to execute.'
	}
];

export default function FAQ() {
	return (
		<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
			<div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
				<h2 className="text-2xl font-bold leading-10 tracking-tight ">
					Frequently asked questions
				</h2>
				<dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
					{faqs.map((faq) => (
						<Disclosure as="div" key={faq.question} className="pt-6">
							{({ open }) => (
								<>
									<dt>
										<Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-gray-200">
											<span className="text-base font-semibold leading-7">{faq.question}</span>
											<span className="ml-6 flex h-7 items-center">
												{open ? (
													<MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
												) : (
													<PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
												)}
											</span>
										</Disclosure.Button>
									</dt>
									<Disclosure.Panel as="dd" className="mt-2 pr-12">
										<p className="text-base leading-7 text-gray-600">{faq.answer}</p>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					))}
				</dl>
			</div>
		</div>
	);
}
