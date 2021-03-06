import os
import sys
import time
import urllib
import logging
import datetime

logger = logging.getLogger()

from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User

from interlink.models import MailingList, IncomingMail, OutgoingMail


class Command(BaseCommand):
    help = "Process all the mail from our MailingLists"
    requires_system_checks = True

    def handle(self, *labels, **options):
        MailingList.objects.fetch_all_mail(logger)
        IncomingMail.objects.process_incoming()
        OutgoingMail.objects.send_outgoing()


# Copyright 2016 Office Nomads LLC (http://officenomads.name/) Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
